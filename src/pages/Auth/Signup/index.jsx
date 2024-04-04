import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../../../services/api/call.api';
// eslint-disable-next-line import/order
import { toast } from 'react-toastify';

function Singup() {
  const [formUserData, setFormUserData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    lastname: '',
    firstname: '',
    birthdate: '',
    address: '',
    zipcode: '',
    city: '',
    country: '',
  });

  const initialFormUserData = {
    email: '',
    password: '',
    passwordConfirm: '',
    lastname: '',
    firstname: '',
    birthdate: '',
    address: '',
    zipcode: '',
    city: '',
    country: '',
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormUserData({ ...formUserData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const notify = () => toast('Wow so easy!');
    try {
      const response = await fetchData('POST', 'auth/signup', formUserData);
      if (response === null || response.error) {
        throw new Error('Une erreur s\'est produite !');
      }
      toast.success('Inscription réussie !');
      setFormUserData({ ...initialFormUserData });

      setTimeout(() => {
        navigate('/signin');
      }, 5500);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="contact-h1">
        Inscription
      </h1>
      <form className="form__signup-container" onSubmit={handleSubmit}>

        <div className="form_div">
          <label className="form_label" htmlFor="email">
            <p className="label_name">Votre Email</p>
            <input className="contact_input" type="email" id="email" name="email" value={formUserData.email} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="lastname">
            <p className="label_name">Nom</p>
            <input className="contact_input" type="text" id="lastname" name="lastname" value={formUserData.lastname} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="firstname">
            <p className="label_name">Prénom</p>
            <input className="contact_input" type="text" id="firstname" name="firstname" value={formUserData.firstname} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="birthdate">
            <p className="label_name">Date de naissance</p>
            <input className="contact_input" type="date" id="birthdate" name="birthdate" value={formUserData.birthdate} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="address">
            <p className="label_name">Adresse</p>
            <input className="contact_input" type="text" id="address" name="address" value={formUserData.address} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="zipcode">
            <p className="label_name">Code postal</p>
            <input className="contact_input" type="text" id="zipcode" name="zipcode" value={formUserData.zipcode} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="city">
            <p className="label_name">Ville</p>
            <input className="contact_input" type="text" id="city" name="city" value={formUserData.city} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="country">
            <p className="label_name">Pays</p>
            <input className="contact_input" type="text" id="country" name="country" value={formUserData.country} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="password">
            <p className="label_name">Mot de passe</p>
            <input className="contact_input" type="password" id="password" name="password" value={formUserData.password} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="passwordConfirm">
            <p className="label_name">Confirmation</p>
            <input className="contact_input" type="password" id="passwordConfirm" name="passwordConfirm" value={formUserData.passwordConfirm} onChange={handleChange} />
          </label>
        </div>

        <button className="submit_contact_button" type="submit">Envoyer</button>

      </form>
    </>
  );
}

export default Singup;
