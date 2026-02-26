import React from "react";
import Button from "../../components/Button/Button";
import WhySponsorBento from "../../components/WhySponsorBento/WhySponsorBento";
import SponsorSkillTree from "../../components/SponsorSkillTree/SponsorSkillTree";
import "./Sponsors2.css";
import SponsorsScroll from "../../components/SponsorsScroll/SponsorsScroll";
import spdata from "../../assets/data/pastSponsors.json";


const Sponsors2 = () => {
    return (
        <section className="sponsors2">
            <section className="intro">
                <h1>Partner with the Legacy of REBECA</h1>
                <p>
                    For 80+ years, REBECA has been the bridge between the glorious past and the innovative future. It is
                    four days of absolute ecstasy, where the nostalgia of one of the country’s most profound alumni
                    bases meets the vibrant energy of today's brightest engineering minds.
                </p>
                <Button innerText={"Download Brochure"} />
            </section>
            <section>
                <h2>Past Sponsors</h2>
                <SponsorsScroll data ={spdata} />
            </section>
            <section className="college">
                <h1>Lets start with a little about our College</h1>
                <div className="left">
                    <p>
                        IIEST, Shibpur, (formerly known as Bengal Engineering College), is one of India's oldest
                        engineering institutions. Renowned for its excellence in engineering education and a strong
                        emphasis on research, the institute nurtures aspiring engineers and scientists to become leaders
                        in their fields. Since the last 168 years, our college has been producing scores of
                        distinguished alumni who have made us immensely proud through their work and dedication.
                    </p>
                </div>
                <div className="right">
                    <img src={"/assets/imgs/sponsorship/clock-tower-iiest.webp"} />
                </div>
            </section>
            <section className="about-rebeca">
                <h1>What is Rebeca</h1>
                <p>
                    REBECA, short for REunion and Bengal Engineering College Annuals, is the annual cultural fest of
                    IIEST, Shibpur. From the classical Saptami night, to the BEings' night on Ashtami, from the soulful
                    Kolkata symphonies on Navami, to the endless Bollywood magic on the Dashami night, our vibrant fest
                    is nothing short of a second Durga Puja to us! Get ready as the 84th edition of REBECA is right
                    around the corner. BEings, Pujo asche!
                </p>
            </section>

            <section>
                <h1>Why Partner with us</h1>
                <WhySponsorBento />
            </section>

            <section>
                <h1>Sponsor Categories</h1>
                <SponsorSkillTree />
            </section>
        </section>
    );
};

export default Sponsors2;
