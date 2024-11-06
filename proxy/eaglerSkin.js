import { encodeULEB128 as encodeVarInt, decodeULEB128 as decodeVarInt } from "@thi.ng/leb128";
import { ChannelMessageType } from "./types.js";
import uuidBuffer from "uuid-buffer";
import { bufferizeUUID } from "./utils.js";
import { EAGLERCRAFT_SKIN_CHANNEL_NAME, EaglerSkinPacketId, MAGIC_ENDING_S_SKINDL_BI } from "./eaglerPacketDef.js";
import sharp from "sharp";
import request from "request";
export function unpackChannelMessage(message) {
    if (message[0] != 0x17 && message[0] != 0x3f)
        throw new Error("Invalid packet ID detected");
    const ret = {
        channel: null,
        data: null,
        type: null
    };
    const Iid = decodeVarInt(message);
    const channelNameLen = decodeVarInt(message.subarray(Iid[1])), channelName = message.subarray(Iid[1] + channelNameLen[1], Iid[1] + channelNameLen[1] + Number(channelNameLen[0])).toString();
    ret.type = Number(Iid[0]);
    ret.channel = channelName;
    ret.data = message.subarray(Iid[1] + channelNameLen[1] + channelName.length);
    return ret;
}
export function packChannelMessage(channel, type, message) {
    const channelNameLen = encodeVarInt(channel.length), buff = Buffer.alloc(1 + channelNameLen.length + channel.length + message.length);
    buff.set([type, ...channelNameLen, ...Buffer.from(channel), ...message]);
    return buff;
}
export function decodeCFetchSkin(message) {
    const ret = {
        id: null,
        uuid: null
    };
    const Iid = decodeVarInt(message), uuid = uuidBuffer.toString(message.subarray(Iid[1]));
    ret.id = Number(Iid[0]);
    ret.uuid = uuid;
    return ret;
}
export function encodeFetchSkin(uuid) {
    uuid = typeof uuid == 'string' ? bufferizeUUID(uuid) : uuid;
    const buff = Buffer.alloc(1 + uuid.length);
    buff.set([EaglerSkinPacketId.C_FETCH_SKIN, ...uuid]);
    return buff;
}
export function decodeSSkinDlBuiltin(message) {
    const ret = {
        id: null,
        uuid: null,
        skinId: null
    };
    const Iid = decodeVarInt(message), uuid = uuidBuffer.toString(message.subarray(Iid[1], Iid[1] + 16));
    ret.id = Number(Iid[0]);
    ret.uuid = uuid;
    const skinId = decodeVarInt(message.subarray(Iid[1] + 16 + 3));
    ret.skinId = Number(skinId);
    return ret;
}
export function encodeSSkinDlBuiltin(uuid, skinId) {
    uuid = typeof uuid == 'string' ? bufferizeUUID(uuid) : uuid;
    const encSkinId = encodeVarInt(skinId);
    const buff = Buffer.alloc(1 + 16 + 3 + encSkinId.length);
    buff.set([EaglerSkinPacketId.S_SKIN_DL_BI, ...uuid, ...Buffer.from(MAGIC_ENDING_S_SKINDL_BI), encSkinId[0]]);
    return buff;
}
export function decodeSSkinDl(message) {
    const ret = {
        id: null,
        uuid: null,
        skin: null
    };
    const Iid = decodeVarInt(message), uuid = uuidBuffer.toString(message.subarray(Iid[1], Iid[1] + 16));
    ret.id = Number(Iid[0]);
    ret.uuid = uuid;
    const skin = message.subarray(Iid[1] + 16);
    ret.skin = skin;
    return ret;
}
export function encodeSSkinDl(uuid, skin, isFetched) {
    uuid = typeof uuid == 'string' ? bufferizeUUID(uuid) : uuid;
    // eaglercraft clients always expect a 16385 byte long byte array for the skin
    if (!isFetched)
        skin = skin.length !== 16384 ? skin.length < 16384 ? Buffer.concat([Buffer.alloc(16384 - skin.length), skin]) : skin.subarray(16383) : skin;
    else
        skin = skin.length !== 16384 ? skin.length < 16384 ? Buffer.concat([skin, Buffer.alloc(16384 - skin.length)]) : skin.subarray(16383) : skin;
    const skinLen = encodeVarInt(skin.length), buff = Buffer.alloc(1 + 16 + 1 + skin.length);
    buff.set([EaglerSkinPacketId.S_SKIN_DL, ...uuid, 0xff, ...skin]);
    return buff;
}
export function decodeCSkinReq(message) {
    const ret = {
        id: null,
        uuid: null,
        url: null
    };
    const Iid = decodeVarInt(message), uuid = uuidBuffer.toString(message.subarray(Iid[1], Iid[1] + 16));
    ret.id = Number(Iid[0]);
    ret.uuid = uuid;
    const urlLen = decodeVarInt(message.subarray(Iid[1] + 16 + 1)), url = message.subarray(Iid[1] + 16 + 1 + urlLen[1]).toString();
    ret.url = url;
    return ret;
}
export function encodeCSkinReq(uuid, url) {
    uuid = typeof uuid == 'string' ? bufferizeUUID(uuid) : uuid;
    const urlLen = encodeVarInt(url.length), eUrl = Buffer.from(url);
    const buff = Buffer.alloc(1 + 1 + 16 + urlLen.length + eUrl.length);
    buff.set([EaglerSkinPacketId.C_REQ_SKIN, ...uuid, 0x00, ...urlLen, ...eUrl]);
    return buff;
}
// TODO: fix broken custom skins
export async function fetchSkin(url) {
    return new Promise((res, rej) => {
        let body = [];
        request({ url: url, encoding: null }, (err, response, body) => {
            if (err) {
                rej(err);
            }
            else {
                sharp(body)
                    .resize(64, 64)
                    .raw({ depth: 'char' })
                    .toBuffer()
                    .then(res)
                    .catch(rej);
            }
        });
    });
}
export function getPlayerWithUUID(uuid) {
    for (const [username, plr] of PROXY.players) {
        if (plr.uuid == uuid)
            return plr;
    }
    return null;
}
export async function processClientReqPacket(decodedMessage, client) {
    if (decodedMessage.type == ChannelMessageType.SERVER)
        throw new Error("Server message was passed to client message handler");
    switch (decodedMessage.data[0]) {
        default:
            throw new Error("Unknown operation");
            break;
        case EaglerSkinPacketId.C_REQ_SKIN:
            const reqSkinPck = decodeCSkinReq(decodedMessage.data);
            if (getPlayerWithUUID(reqSkinPck.uuid)) {
                client.ws.send(packChannelMessage(EAGLERCRAFT_SKIN_CHANNEL_NAME, ChannelMessageType.SERVER, encodeSSkinDl(reqSkinPck.uuid, getPlayerWithUUID(reqSkinPck.uuid).skin.customSkin, false)));
            }
            else {
                try {
                    const skin = await fetchSkin(reqSkinPck.url);
                    const resPck = encodeSSkinDl(reqSkinPck.uuid, skin, true);
                    client.ws.send(packChannelMessage(EAGLERCRAFT_SKIN_CHANNEL_NAME, ChannelMessageType.SERVER, resPck));
                }
                catch (_a) { }
            }
            break;
        case EaglerSkinPacketId.C_FETCH_SKIN:
            const fetchSkinPlrPck = decodeCFetchSkin(decodedMessage.data);
            const plr = getPlayerWithUUID(fetchSkinPlrPck.uuid);
            if (plr) {
                if (plr.skin.type == 'BUILTIN') {
                    client.ws.send(packChannelMessage(EAGLERCRAFT_SKIN_CHANNEL_NAME, ChannelMessageType.SERVER, encodeSSkinDlBuiltin(plr.uuid, plr.skin.skinId)));
                }
                else {
                    client.ws.send(packChannelMessage(EAGLERCRAFT_SKIN_CHANNEL_NAME, ChannelMessageType.SERVER, encodeSSkinDl(plr.uuid, plr.skin.customSkin, false)));
                }
            }
    }
}
