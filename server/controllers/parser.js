import axios from "axios";
import jsdom from 'jsdom';
import puppeteer from 'puppeteer';

export const getCurrency = async (req, res) => {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://sberometer.ru", {
            waitUntil: 'domcontentloaded'
        })


        let data = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".tek-moment .block")).map((block) => {
                return {
                    title: block.querySelector(".title").textContent,
                    value: block.querySelector(".rate .value").textContent,
                };
            });
        });
        await browser.close();
        return res.json({ message: "Get currency successfully", data })
    } catch (error) {
        res.json({ message: 'Error while getting currncy course' })
    }
}
export const getOilCost = async (req, res) => {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://www.profinance.ru/chart/brent/", {
            waitUntil: 'domcontentloaded'
        })


        let data = await page.evaluate(() => {
            return {
                title: "Стоимость нефти марки Brent",
                value: document.querySelector("#tr_Brent_oil #b_Brent_oil").textContent
            }
        });

        await browser.close();

        return res.json({ message: "Get oil costs successfully", data })
    } catch (error) {
        res.json({ message: 'Error while getting oil costs' })
    }
} 