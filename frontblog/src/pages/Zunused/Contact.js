import React, { useRef, useState } from 'react'
import "./Contact.css"
import { MdOutlineEmail } from "react-icons/md"
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import emailjs from '@emailjs/browser';
import Popup from '../../components/Popup'

const Contact = ({ redirectHandler }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();

  const submitHandler = (event) => {
    event.preventDefault()

    emailjs.sendForm('service_nb7xm3y', 'template_yd3edys', form.current, 'P3xGqGmdEYAAGcK2r')
      .then((result) => {
        console.log(result.text);
        setMessage("Message sent successfully")
        setShowPopup(true)
      },
        (error) => {
          console.log(error.text);
          setMessage("Internal Error")
          setShowPopup(true)
        });
  }

  return (
    <>
      <div className='contact-main-container'>
        <h2>Get in Touch</h2>

        <div className="contact__container">
          <div className="contact__options">
            <article className="contact__option" onClick={() => redirectHandler("mailto:awasthiyogendra271@gmail.com")}>
              <MdOutlineEmail className='contact__option-icon' />
              <h3>Email</h3>
              <h5>awasthiyogendra271@gmail.com </h5>
              <a className='link' href="mailto:awasthiyogendra271@gmail.com">Send an email</a>
            </article>
            <article className="contact__option" onClick={() => redirectHandler("https://www.linkedin.com/in/yogndr/")}>
              <FaLinkedin className='contact__option-icon' />
              <h3>Linkedin</h3>
              <h5>linkedin/in/yogndr</h5>
              <a className='link' href="https://www.linkedin.com/in/yogndr/">Connect with me</a>
            </article>
            <article className="contact__option" onClick={() => redirectHandler("https://github.com/Yogndrr")}>
              <FaGithub className='contact__option-icon' />
              <h3>Github</h3>
              <h5>/Yogndrr</h5>
              <a className='link' href="https://github.com/Yogndrr">View my profile</a>
            </article>
          </div>

          <form ref={form} onSubmit={submitHandler}>
            <input type="text" name='user_name' placeholder='Your Full Name' required />
            <input type="email" name='user_email' placeholder='Your Email' required />
            <textarea name="message" rows="7" placeholder='Your Message' required ></textarea>
            <button type='submit' className="btn btn-primary" value="Send">Submit</button>
          </form>
        </div>
      </div>
      {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
    </>
  )
}

export default Contact
