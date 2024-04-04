/* eslint-disable no-console */
import './index.css';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import fetchData from '../../services/api/call.api';

function ContactForm() {
  const token = localStorage.getItem('authApiToken');
  let email = '';

  if (token) {
    const decodedToken = jwtDecode(token);
    email = decodedToken.email;
  }

  const [formData, setFormData] = useState({
    from: '',
    subject: '',
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchData('POST', 'contact', formData);
      if (response === null || response.error) {
        // Affichez la modal d'erreur en cas d'échec de l'envoi
        return;
      }

      toast.success('Message envoyé !');

      setFormData({
        from: email,
        subject: '',
        company: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <h1 className="contact-h1">
        Contact
      </h1>
      <form className="form_containeur" onSubmit={handleSubmit}>

        <div className="form_div">
          <label className="form_label" htmlFor="from">
            <p className="label_name">Votre Email*</p>
            <input className="contact_input" type="email" id="from" name="from" value={formData.from} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="subject">
            <p className="label_name">Objet*</p>
            <input className="contact_input" type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="company">
            <p className="label_name">Entreprise</p>
            <input className="contact_input" type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="message">
            <p className="label_name">Message*</p>
            <textarea className="contact_text-area" id="message" name="message" value={formData.message} onChange={handleChange} />
          </label>
          <p className="form_label">* (Champs obligatoires)</p>
        </div>

        <button className="submit_contact_button" type="submit">Envoyer</button>

      </form>
    </>
  );
}

export default ContactForm;
