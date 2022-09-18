"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const cheerio = require("cheerio");
let AppService = class AppService {
    async getTodayRate() {
        const res = {
            dolar: null,
            euro: null,
            yuan: null,
            lira: null,
            rublo: null,
        };
        try {
            const response = await axios_1.default.get('http://www.bcv.org.ve/');
            const $ = cheerio.load(response.data);
            const dolarAttr = $('#dolar');
            const dolarRate = dolarAttr.find('strong').html();
            if (dolarRate) {
                res.dolar = Number(dolarRate.replace(',', '.'));
            }
            const euroAttr = $('#euro');
            const euroRate = euroAttr.find('strong').html();
            if (euroRate) {
                res.euro = Number(euroRate.replace(',', '.'));
            }
            const yuanAttr = $('#yuan');
            const yuanRate = yuanAttr.find('strong').html();
            if (yuanRate) {
                res.yuan = Number(yuanRate.replace(',', '.'));
            }
            const liraAttr = $('#lira');
            const liraRate = liraAttr.find('strong').html();
            if (liraRate) {
                res.lira = Number(liraRate.replace(',', '.'));
            }
            const rubloAttr = $('#rublo');
            const rubloRate = rubloAttr.find('strong').html();
            if (rubloRate) {
                res.rublo = Number(rubloRate.replace(',', '.'));
            }
            return res;
        }
        catch (error) {
            throw new common_1.HttpException('Error de conexión con el BCV', 504);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map