import { useSelector } from "react-redux";

import AvailableContact from "./AvailableContacts";
import ContactForm from "./contactForm";

const Contact = () => {
  const user = useSelector(state => state.user.user);

  return (
    <div style={{height:'inherit',display: 'inline'}}>
      {user.position === "Teacher" && <ContactForm />}
      <AvailableContact />
    </div>
  );
};

export default Contact;
