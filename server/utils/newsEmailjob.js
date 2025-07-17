import cron from 'node-cron';
import axios from 'axios';
import User from '../../models/User.js';
import { transporter } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

cron.schedule('*/2 * * * *',async () => {
    console.log('checking for breaking news every 30 minutes');
    try{
        const users = await User.find();
        for(const user of users){
            for(const category of user.preferences){
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                        params:{
                            category,
                            country: 'us',
                            apiKey: process.env.NEWS_API_KEY,
                        },
                });
                const articles = response.data.articles.slice(0, 3);
                const htmlContent = articles.map(article => `
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}">Read more</a>
                `).join(' ');

                //send email to user
                await transporter.sendMail({
                    from:` "News App" <${process.env.EMAIL_USER}>`,
                    to: user.email,
                    subject: `Breaking News in ${category.toUpperCase()}`,
                    html:htmlContent
                });
                console.log(`Email sent to ${user.email} for category ${category}`);
            }
        }
    } catch(error){
        console.error('Error sending emails:', error.message);
    }
});