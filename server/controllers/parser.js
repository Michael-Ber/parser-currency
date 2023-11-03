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
                    value: Number(block.querySelector(".rate .value").textContent),
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
        await page.goto("https://quote.rbc.ru/ticker/181206", {
            waitUntil: 'domcontentloaded'
        })

        
        let data = await page.evaluate(() => {
            return {
                title: "Стоимость нефти марки Brent",
                value: Number(document.querySelector(".chart__info__sum").textContent.replace(/\$/, '').replace(/,/ig, '.'))
            }
        });
        await browser.close();

        return res.json({ message: "Get oil costs successfully", data })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Error while getting oil costs', error })
    }
} 