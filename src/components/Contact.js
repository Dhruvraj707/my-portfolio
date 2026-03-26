import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from 'emailjs-com';

export const Contact = () => {

  const formInitialDetails = {
    user_name: '',
    user_email: '',
    user_phone: '',
    message: ''
  }

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send Message');
  const [status, setStatus] = useState(null);

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    onFormUpdate('user_phone', value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formDetails.user_phone.length < 10) {
      setStatus({ success: false, message: "Enter valid phone number" });
      return;
    }

    setButtonText("Sending...");

    emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      formDetails,
      process.env.REACT_APP_PUBLIC_KEY
    )
    .then(() => {
      setStatus({ success: true, message: "Message sent successfully ✅" });
      setButtonText("Send Message");
      setFormDetails(formInitialDetails);
    })
    .catch(() => {
      setStatus({ success: false, message: "Something went wrong ❌" });
      setButtonText("Send Message");
    });
  };



  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">

          <Col md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img
                  className={isVisible ? "animate__animated animate__zoomIn" : ""}
                  src={contactImg}
                  alt="Contact"
                />
              }
            </TrackVisibility>
          </Col>

          <Col md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>

                  <h2>Get In Touch</h2>

                  <form onSubmit={handleSubmit}>
                    <Row className="g-3">

                      <Col xs={12}>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formDetails.user_name}
                          onChange={(e) => onFormUpdate('user_name', e.target.value)}
                          required
                        />
                      </Col>

                      <Col xs={12}>
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={formDetails.user_email}
                          onChange={(e) => onFormUpdate('user_email', e.target.value)}
                          required
                        />
                      </Col>

                      <Col xs={12}>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={formDetails.user_phone}
                          onChange={handlePhoneChange}
                          maxLength="10"
                          required
                        />
                      </Col>

                      <Col xs={12}>
                        <textarea
                          rows="5"
                          placeholder="Message"
                          value={formDetails.message}
                          onChange={(e) => onFormUpdate('message', e.target.value)}
                          required
                        />
                      </Col>

                      <button type="submit">
                        <span>{buttonText}</span>
                      </button>

                      {status && (
                        <Col>
                          <p className={status.success ? "success" : "error"}>
                            {status.message}
                          </p>
                        </Col>
                      )}

                    </Row>
                  </form>

                </div>
              }
            </TrackVisibility>
          </Col>

        </Row>
      </Container>
    </section>
  )
}