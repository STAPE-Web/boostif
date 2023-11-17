import Item1 from '@/assets/Item1.jpg'
import Item2 from '@/assets/Item2.jpg'
import Item3 from '@/assets/Item3.jpg'
import Item4 from '@/assets/Item4.jpg'
import Item5 from '@/assets/Item5.jpg'
import Item6 from '@/assets/Item6.jpg'
import Item7 from '@/assets/Item7.jpg'
import Item8 from '@/assets/Item8.jpg'
import Item9 from '@/assets/Item9.jpg'
import Item10 from '@/assets/Item10.jpg'
import Item11 from '@/assets/Item11.jpg'
import Item12 from '@/assets/Item12.jpg'
import Item13 from '@/assets/Item13.jpg'
import Item14 from '@/assets/Item14.jpg'
import Item15 from '@/assets/Item15.jpg'
import Item16 from '@/assets/Item16.jpg'
import Item17 from '@/assets/Item17.jpg'
import Item from '../Item'
import styles from './style.module.css'
import { useSearchParams } from 'react-router-dom'

const ListItems = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const items = [
        { id: 1, title: 'Diablo 4', image: Item3, description: "Boost your Diablo 4 character's level, paragon, gear with no effort. We will save your time and beat any challenge you face." },
        { id: 2, title: 'WoW Dragonflight', image: Item1, description: "Buy safe WoW carries with pro players. Vast catalog of boosts for high-end PvE and PvE activities, as well as solo-farm and coaching." },
        { id: 3, title: 'WoW Classic Hardcore', image: Item7, description: 'Buy WoW Classic Hardcore boosting products to help your character survive on their quest of reaching the highest level in this ruthless version of the game.' },
        { id: 4, title: 'WoW WotLK', image: Item5, description: "Buy WoW WotLK carries with pro carries! Increase your character's level to 80, gear up, get gold, and venture to raids or arena. With our pros you'll achieve outstanding results in no time." },
        { id: 5, title: 'Destiny 2', image: Item4, description: "Shop numerous carry services for Destiny 2, including raid boosts, exotics farming, and so much more. Fast and safe." },
        { id: 6, title: 'The Elder Scrolls Online (TESO)', image: Item2, description: "Buy top-rated boosts for ESO from professional carries. We’ll help you with raids, gear, champion points, power leveling, and many other high-end activities!" },
        { id: 7, title: 'Escape from Tarkov', image: Item6, description: "We've got all your EFT needs covered! Leveling, currencies delivery, raid boosts, and so much more!" },
        { id: 8, title: 'Valorant', image: Item8, description: "Buy Valorant carries to get ahead of your friends and rivals! Raise your rank, gets as many wins as you need, unlock all the rewards you want – we can make it happen!" },
        { id: 9, title: 'Apex Legends', image: Item9, description: "Buy Apex Legends boosting services at a great price! Outrank your friends and rivals easily with our rank carries, win boosts, and so much more!" },
        { id: 10, title: 'League Of Legends', image: Item10, description: "Buy affordable and high-quality League of Legends boosts and get a high rank sooner than you expect! Lots of options available: solo, duo, placement boost, and more!" },
        { id: 11, title: 'Overwatch 2', image: Item11, description: "Buy all kinds of OW2's boosting services including competitive wins, rating carries, placement matches boost, and so much more!" },
        { id: 12, title: 'FIFA 24', image: Item12, description: "Find all the useful services that you might need for your FC24 account! Fast and cheap coins delivery and more!" },
        { id: 13, title: 'Final Fantasy XIV', image: Item13, description: "Get any sort of help you need in the world of Final Fantasy! Power leveling, raid carries, mounts unlock – we have it all! Great price and lots of options!" },
        { id: 14, title: 'Lost Ark', image: Item14, description: "Get any kind of service in Lost Ark! We can help you with leveling your character, gearing it up, and beating the hardest challenges! Great prices and high quality." },
        { id: 15, title: 'New World', image: Item15, description: "Conquer Aeternum with our NW boosts! Level up faster, gear up with less effort, and get as many coins as you need! Fair price and high quality!" },
        { id: 16, title: 'GTA 5 Online', image: Item16, description: "Power up your character and top up your balance with our handy boosting services! Run Los Santos in a good company!" },
        { id: 17, title: 'Path of Exile', image: Item17, description: "Buy PoE Currency, lowest prices, fast delivery, any amount of any Path of Exile Currencies" },
    ]

    return (
        <div className={styles.List}>
            {items.filter(item => item.title.toLocaleLowerCase().includes(query?.toLocaleLowerCase() || "")).map(item => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    )
}

export default ListItems