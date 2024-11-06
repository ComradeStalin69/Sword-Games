export var EaglerPacketId;
(function (EaglerPacketId) {
    EaglerPacketId[EaglerPacketId["IDENTIFY_CLIENT"] = 1] = "IDENTIFY_CLIENT";
    EaglerPacketId[EaglerPacketId["IDENTIFY_SERVER"] = 2] = "IDENTIFY_SERVER";
    EaglerPacketId[EaglerPacketId["LOGIN"] = 4] = "LOGIN";
    EaglerPacketId[EaglerPacketId["LOGIN_ACK"] = 5] = "LOGIN_ACK";
    EaglerPacketId[EaglerPacketId["SKIN"] = 7] = "SKIN";
    EaglerPacketId[EaglerPacketId["C_READY"] = 8] = "C_READY";
    EaglerPacketId[EaglerPacketId["COMPLETE_HANDSHAKE"] = 9] = "COMPLETE_HANDSHAKE";
    EaglerPacketId[EaglerPacketId["DISCONNECT"] = 255] = "DISCONNECT";
    EaglerPacketId[EaglerPacketId["CUSTOM_PLAYER_LIST_ADD_PACKET"] = 56] = "CUSTOM_PLAYER_LIST_ADD_PACKET";
})(EaglerPacketId || (EaglerPacketId = {}));
export var DisconnectReason;
(function (DisconnectReason) {
    DisconnectReason[DisconnectReason["CUSTOM"] = 8] = "CUSTOM";
})(DisconnectReason || (DisconnectReason = {}));
export const MAGIC_BUILTIN_SKIN_BYTES = [0x00, 0x05, 0x01, 0x00, 0x00, 0x00];
export const MAGIC_ENDING_IDENTIFY_S_BYTES = [0x00, 0x00, 0x00];
export const MAGIC_ENDING_S_SKINDL_BI = [0x00, 0x00, 0x00];
export const EAGLERCRAFT_SKIN_CHANNEL_NAME = "EAG|Skins-1.8";
export const PlayerListJson1 = {
    timestamp: null,
    profileId: '65a4a3d370cb49bbad67f10086f1c543',
    profileName: 'lax1dude',
    signatureRequired: true,
    textures: {
        SKIN: {
            url: 'http://textures.minecraft.net/texture/d46393de83fbe165ab680a1821aad9f07d08b8196b2429fa046a15b61b129dc4'
        }
    }
};
export const PlayerListBase64Str = "¬X1eTQrruDPy+qp5pBNo+zIoPXGdhJKkhtPPgKIcBzgBDcp/CXhbcZong7886HSQyA2YMDL+muRgY+GLri+QH0wF5yZC5S1Nm8GrPPMScrWsgZRtyIv/cZnIQUtRAS4SQroup3M42s3blUjGjTfkjWTy5xxuHGaiXpgI1wAjsONfJebNLe+v3DvO2/7sbmMSQTEduODhF8J1QL44aiL5mAZFV+4XMzRVrs3wsIScwPaCSXqLRudn2tLRC5fylejnq5S9AHz17bDlwyWmMeG5djusM3ZVjYKfu3Bi/vEhG9eEyWhBxcDKilrXJ1ZwOeotwgwnafY4OLc18fS7w1LxHkedZLs/8gHZOpUQHcx2Kxhib5BOdRDMae+AuDRbR9Lk33txzYNlOS6drxHkpEyRwFTu7RYTQUIE+0Dljk4mZDqnTSd5ZDwb45FfYvm25nEu2r5hPj/UNUCAPTToNTCABWvWWuigVjt8pvATV05KPlzTl6bWqrLn822upkC3joP+H+GVR8TkdkGzyyjDbndt1hTXW+zIuB2og2oMuHAO5kI6JtEl26wk7eNYmBr4va6UpiEXAhYa10nRny+Fu9gHCHgMCW7n50+gK3IOAzxLt0QkrlYXgJI6uh5f125g/yMe7v5y49VpHwDcPkYBLcX0L9lxJh8EQem6ff8SLjcAwmdU=";
// Afterwards, forward 0x01 (Join Game, Clientbound) and everything after that
// EAGLERCRAFT SKIN PROTOCOL
// All Eaglercraft skin networking is done through plugin channels under the channel name EAG|Skins-1.8.
// Below are some packet defs.
export var EaglerSkinPacketId;
(function (EaglerSkinPacketId) {
    EaglerSkinPacketId[EaglerSkinPacketId["C_FETCH_SKIN"] = 3] = "C_FETCH_SKIN";
    EaglerSkinPacketId[EaglerSkinPacketId["S_SKIN_DL_BI"] = 4] = "S_SKIN_DL_BI";
    EaglerSkinPacketId[EaglerSkinPacketId["S_SKIN_DL"] = 5] = "S_SKIN_DL";
    EaglerSkinPacketId[EaglerSkinPacketId["C_REQ_SKIN"] = 6] = "C_REQ_SKIN";
})(EaglerSkinPacketId || (EaglerSkinPacketId = {}));
