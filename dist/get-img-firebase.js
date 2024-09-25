"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getImageUrl;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    storageBucket: "project25363.appspot.com",
};
// Khởi tạo Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)(app);
function getImageUrl(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const imageRef = (0, storage_1.ref)(storage, fileName);
            const url = yield (0, storage_1.getDownloadURL)(imageRef);
            return url;
        }
        catch (error) {
            console.error("Error getting image URL:", error);
            return null;
        }
    });
}
