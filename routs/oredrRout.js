import express from "express";
import TelegramBot from "node-telegram-bot-api";
const orderRout = express.Router()


const token = '2104856504:AAFxPH2hw5iRtHIvioZQvw-bMCy3syjvdpE';
const chatId = "-644140470"
const bot = new TelegramBot(token, {polling: true});

orderRout.post("/order/", (req, res) => {
    try {
        const data = req.body
        bot.sendMessage(chatId, `Імя клієнта ${data.name}, EMAIL:${data.email}, Мінімальний прайс:${data.minPrice}, Максимальний прайс:${data.maxPrice}, ${data.estimate}, ${data.label}, ${data.nda}, цікавлять такі послуги як: ${data.webDesign !== false && data.webDesign},${data.appDesign !== false && data.appDesign},${data.branding !== false && data.branding},${data.Illustrations !== false && data.Illustrations},${data.Frontend !== false && data.Frontend},${data.Backend !== false && data.Backend},${data.CMS !== false && data.CMS},${data.CRM !== false && data.CRM},${data.Bot !== false && data.Bot},${data.SEO !== false && data.SEO},${data.SMM !== false && data.SMM},${data.Target !== false && data.Target},${data.Copywriting !== false && data.Copywriting},${data.Other !== false && data.Other}`);
        res.status(200).json(data)
    }catch(e) {
        console.log(e)
        res.status(500).json({
            message: "erro send"
        })
    }
})
export default orderRout