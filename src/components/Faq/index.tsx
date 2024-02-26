import React, { useState, } from "react"
import styles from "./style.module.css"
import FaqItem from "@/ui/FaqItem"

const Faq = () => {
    const [tab, setTab] = useState("Buying")
    const tabs = ["Buying", "Website account", "Safety", "Refunds", "General"]

    const questions = [
        {
            tab: "Buying", array: [
                { title: "How do I buy?", text: "First, you find the service you need in our catalog: you can either navigate our categories or use the search box. After that you select all the options you need (you can always consult us to learn more about them) and add the product to the shopping cart. As soon as you've added all the products you wanted, go to the cart and proceed to the checkout. There you add your payment details, make the purchase, and that's it! After that you will be seamlessly connected to one of our friendly support managers via web chat. They will explain the next steps and take care of you." },
                { title: "What payment methods can I use?", text: "We have numerous payment options, which are processed by the 3 largest and most secure payment providers across the US and Europe - Stripe, Payop and PayPal. On the website you can pay with a card, apple/google pay, Link, Giropay, Sofort, iDeal, Skrill, direct bank transfer and many other similar methods as well as crypto currency." },
                { title: "Why should I trust you?", text: "There 3 main reasons why we are trustworthy:\n1. Our reputation speaks for ourselves: check out our 5-star rated Trustpilot to see what other gamers like you say about us.\n2. Your transaction is secured by our Refund policy. Basically, it means that there are only 2 outcomes: you're either happy with what you've got or you get a full refund. There are no hidden fees and we don't keep the money if you're unsatisfied with our services.\n3. 100% of the website is owned and operated by an officially registered and reputable company CELLYNX MANAGEMENT LTD, registration number - HE 434496. We don't hide our identity like many other similar websites do." },
                { title: "Can I get a discount?", text: "Most certainly! You can get a 15% discount for your first purchase with the promocode: WELCOME. Just apply it on checkout before payment." },
                { title: "Can I schedule my boost?", text: "Absolutely! You can choose the time when we will perform the service for you. Although, while most of our boosts can be scheduled for any time you want, some services, especially the ones that require involvement of large amounts of people, might require more complex scheduling. In such cases we will offer you a variety of available time slots and you will choose the best fit for you." },
                { title: "Who will be my booster?", text: "In our strive to perform the best possible services for our customers we take it very seriously when it comes to choosing who to work with. Only the most reliable and efficient player has a chance to be assigned to your order. This way we ensure that your boost will be completed in timely manner and as safely as possible." },
                { title: "How do I get updates about my order?", text: "All the important information will be passed to you through the contact details you've provided us with. However, if you have any questions or just need a heads up about the progress of your boost, you're more than welcome to message us anytime, our support is there for you 24/7 (literally, even during the deepest night)!" },
                { title: "What's next after I've made the purchase?", text: "We'll need more details from you to start doing your order. Depending on the game you've bought the boost for and the options you've chosen, it might be a character name, account login, etc..\nTo get those details we'll contact you soon after you've finished the payment via our user-friendly web chat." },
            ]
        },
        {
            tab: "Website account", array: [
                { title: "What are the benefits of account on your website?", text: "Signing up for an account returns you lots of benefits:\n1. collect and use bonus points;\n2. check your order's status online;\n3. make purchases with a couple of clicks;\n4. see your order history all in one place;\n5. learn about special offers first.\n To learn more about your account's features, you can always contact us." },
                { title: "What personal information do you store?", text: "We only store your contact details like email, Discord tag, etc.. We never store your payment details though, as well as anything else not mentioned above." },
                { title: "How do I navigate my account?", text: "There are several places of interest in your account. Let's take a closer look at them.\nMy orders page: it stores your order history. You can see details of every order you've made with us. There you can also do the 'order again' which automatically creates a new order with the same contents as in the chosen previous order.\nSettings: you can change your contact details here, set/change your username, and change password.\nBonus points section on the left: shows you how many bonus points you've already collected. It helps you understand the size of the discount you can make with them for your next order.\nHelp center: if you have any questions regarding your account or anything else, this button will connect you with one of our friendly support agents in the website chat." },
            ]
        },
        {
            tab: "Safety", array: [
                { title: "Is my money safe with you?", text: "Yes, your money is safe with us, because it is in our best interest to keep it safe. We've protected our website with modern security protocols to keep your payments and personal data safe.\n\nSince we’re an officially registered company and we have an excellent reputation, we can't disregard the payment safety and we do our best to keep it all very secure" },
                { title: "Are your products legal?", text: "Yes, boosting services are legal. Both for those who buy and sell them. There are no laws that restrict any in-game boosting in any country.\n\nExcept for the Republic of Korea (aka South Korea) – if you happen to live there, get in touch with us to learn more about the legality of boosting in your country." },
                { title: "Is my account safe with you?", text: "Yes, your account is safe with us. We only hire people with impeccable reputation to make sure they won't ever do anything bad to your account and in-game belongings.\n\nSince we’re an officially registered company and we have an excellent reputation, we can't disregard the account safety and we do our best to keep all our procedures secure.\n\nThat said, there's always a risk that the company that owns the game might decide to penalize accounts of people who buy or sell boosts there. We take all the precautions to reduce that risk to as low as possible." },
            ]
        },
        {
            tab: "Refunds", array: [
                { title: "Can I have a refund?", text: "Yes, you can. Although it's unlikely that you'll be disappointed with the quality of our service, everyone sometimes makes mistakes and if it's us who did something wrong, we'll do our best to make up for that. Even if it takes a full or partial refund.\n\nAlso, you can request a refund even if there's nothing wrong but you just need the money back for whatever reason. However, if the boost has already started, we won't be able to send you the full amount because our players still need their pay for the work they've already done." },
                { title: "How do I request a refund?", text: "Just message us via any method of your preference. Tell us that you need a refund and our customer support will help you with that." },
                { title: "How long does it take to refund money?", text: "We send the money back within 2 workdays. After we've sent the money, everything depends on your bank. Different banks complete transactions at different speed, so you might consider asking your bank's representative about the estimated delivery time. On average customers receive a refund within a week – they rarely have to wait longer than that." },
            ]
        },
        {
            tab: "General", array: [
                { title: "What is ArmadaBoost?", text: "ArmadaBoost is one of the most respected boosting stores currently on the market. We have been in business since 2017 and have earned lots of experience and fans after all those years. You can find hundreds of reviews that we've collected throughout that time on our Trustpilot page.\n\nWe offer boosting services in a wide range of games: World of Warcraft, Elder Scrolls Online, Destiny 2, Diablo games, and so on. We help players with lots of different activities: it can be a character/account leveling, obtaining some rare item, defeating a challenging boss for you, and so on." },
                { title: "How can ArmadaBoost be of use to you?", text: "If you don't have enough time to play or if you're just new to the game,  you might find yourself in a situation when you need help with some challenge. That's where we come in: our professional players do the hard work for you and remove the obstacle that made your experience with it less pleasant than you expected." },
                { title: "What makes ArmadaBoost stand out of the competition?", text: "Our support is always friendly and ready to respond fast 24/7. Our prices are lower than average because we update them daily. Our pro players are reliable and complete objectives fast because we'd choose to pay more to great players and make your experience awesome than pay less to worse ones and deliver bad quality." },
            ]
        },
    ]

    return (
        <div className={styles.Faq}>
            <div className={styles.Tabs}>
                {tabs.map((t, index) => (<div onClick={() => setTab(t)} className={t === tab ? styles.ActiveTab : ""} key={index}>{t}</div>))}
            </div>

            <div className={styles.List}>
                {questions.map((q, index) => (
                    <React.Fragment key={index}>
                        {q.tab === tab && <React.Fragment>
                            {q.array.map((array, index) => (
                                <FaqItem array={array} key={index} />
                            ))}
                        </React.Fragment>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Faq