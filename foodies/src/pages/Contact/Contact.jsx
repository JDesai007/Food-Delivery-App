import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill all required fields.");
      return;
    }

    // Call EmailJS API
    emailjs
      .send(
        "service_d7z4eqt", // 🔹 Replace with your EmailJS service ID
        "template_36gdnib", // 🔹 Replace with your EmailJS template ID
        {
          name: formData.firstName + " " + formData.lastName, // maps to {{name}}
          email: formData.email, // maps to {{email}}
          message: formData.message, // maps to {{message}}
          time: new Date().toLocaleString(), // maps to {{time}}
        },
        "O4GDsJB-KVIwUe8AN" // 🔹 Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("✅ Thank you! Your message has been sent.");
          setFormData({ firstName: "", lastName: "", email: "", message: "" });
        },
        (error) => {
          setStatus("❌ Failed to send message. Please try again later.");
          console.error(error);
        }
      );
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form p-5 shadow-sm bg-white">
              <h2 className="text-center mb-4">Get in Touch</h2>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-control custom-input"
                      placeholder="First Name *"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-control custom-input"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control custom-input"
                      placeholder="Email Address *"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control custom-input"
                      rows="5"
                      placeholder="Your Message *"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

              {status && (
                <p className="mt-3 text-center status-message">{status}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
