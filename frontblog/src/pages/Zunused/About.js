import React from 'react'
import "./About.css"
import yog from "../../assets/yogi.jpg"
import { FaAward } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { VscFolderLibrary } from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import Resume from "../../assets/resume.pdf";

const About = ({ redirectHandler }) => {

    const navigate = useNavigate()
    return (
        <div className='about'>
            <h5>Hey there</h5>
            <h2> I'm the developer behind this project..</h2>

            <div className="container about__container">
                <div className="about__me">
                    <div className="about__me-image">
                        <img src={yog} alt="" />
                        <div className="about__me-name">
                            <h2>Yogendra Awasthi</h2>
                        </div>
                    </div>
                </div>
                <div className="about__content">
                    <div className="about__cards">

                        <article className="about__card" onClick={() => redirectHandler("https://github.com/Yogndrr?tab=repositories")}>
                            <VscFolderLibrary className="about__icons" />
                            <h5>Projects</h5>
                            <small>10+ Completed</small>
                        </article>

                        <article className="about__card">
                            <FaAward className="about__icons" />
                            <h5>Skills</h5>
                            <small>MERN Stack</small>
                        </article>

                        <article className="about__card" onClick={() => { navigate("/contact") }}>
                            < FiUsers className="about__icons" />
                            <h5>Clients</h5>
                            <small>You Could Be The 1st.</small>
                            <br />
                            <small>Contact Now</small>
                        </article>

                    </div>
                    <p>I am an innovative MERN developer with a passion for creating web applications that are intuitive and user-friendly. With my strong React and NodeJS skills, I am constantly seeking out new challenges and opportunities to learn and grow. I am always eager to stay up-to-date with the latest technologies and best practices, and I thrive in dynamic, fast-paced environments where I can apply my skills and expertise to create outstanding web experiences.
                        <br /> <br /> I have strong foundation in both frontend with ReactJS and backend with NodeJS and MongoDB. <br /><br />If you are interested in collaborating with me on a project, or if you have any questions, please don't hesitate to reach out. I would love to hear from you! You can find my contact information on the my contact page. Thank you for taking the time to learn more about me and my work.
                    </p>
                    <a href={Resume} download className='download__links'>Download CV</a>
                    <Link className='contact__links' to="/contact">Contact Me</Link>
                </div>
            </div>
        </div >
    )
}

export default About