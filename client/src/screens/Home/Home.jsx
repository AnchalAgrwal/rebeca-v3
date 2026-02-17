import "./Home.css";
import Heading from "../../components/Headingv2/Headingv2";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

import Nightbanner from "../../components/Nightbanner/Nightbanner";
import CollageHeart from "../../components/CollageHeart/CollageHeart";
import Hero from "../../components/ScrollFancy/Hero"

const Home = () => {
    const artists = [
        {
            name: "Arunashish Roy",
            img: "ArunashishRoy.webp",
        },
        {
            name: "Jannat Sufi Band",
            img: "JannatSufiBand.webp",
        },
        {
            name: "Senjuti Das",
            img: "SenjutiDas.webp",
        },
        {
            name: "Fakirs Music",
            img: "FakirBand.webp",
        },
        {
            name: "The Anupam Roy Band",
            img: "anupamroyband.webp",
        },
        {
            name: "Amit Mishra",
            img: "AmitMishra.webp",
        },
        {
            name: "M Sonic",
            img: "MSonic.webp",
        },
    ];
    const { innerWidth: width, innerHeight: height } = window;

    return (
        <div className="home">
            <div className="wave-bg">
                <img src="/assets/imgs/home/wavy_bg.webp" alt="" />
            </div>
            <Hero />
            <section className="section-2">
                <div className="banner">
                    <div className="display-font">BEings, are you ready?</div>
                    <div className="display-font">the countdown to our very own Pujo has already begun.</div>
                </div>
            </section>
            <section className="section-3">
                <h1 className="date">MARCH 20-23</h1>
                <h4>LORDS' GROUND, IIEST SHIBPUR</h4>
                <p>Prepare to be swept away as you put your best foot forward in this epic celebration of creativity and culture tha promises you laughter, joy and memories that will last you a lifetime and more.</p>
            </section>
            <section className="section-4">
                <Heading title={"ARTISTS"} />
            </section>
            <section className="section-5">
            </section>
        </div>
    );
};

export default Home;
