"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("instagram-x/src"));
const instaX = new src_1.default();
let username = 'username';
let password = 'password';
instaX.getUserId('gopro')
    .then(user_id => {
    instaX.getListFollowers('gopro', user_id, '')
        .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=requests.js.map