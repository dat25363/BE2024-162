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
const storage_1 = require("firebase/storage");
const app_1 = require("firebase/app");
const constant_1 = require("../config/constant");
const firebaseConfig = { storageBucket: constant_1.FIREBASE.STORAGE_BUCKET };
const app = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)(app);
const getImageUrl = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = getImageUrl;
