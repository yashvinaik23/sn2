import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import { GetContact } from "../../../actions/actions";
import { DeleteContact } from "../../../actions/actions";
import ContactItem from "./ContactItem";


const AvailableContacts = (props) => {
 
  const getContact = async () => {
    await props?.GetContact();
  };
  useEffect(() => {
    getContact();
  }, []);

  return (
    <section style={{ position: "relative" }}>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {props?.contact.map((con) => (
          <ContactItem
            key={con._id}
            id={con._id}
            name={con.name}
            description={con.description}
            email={con.email}
            number={con.number}
          />
        ))}
      </Grid>
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    contact: state.user.contact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetContact: () => GetContact(),
      DeleteContact: (id) => DeleteContact(id),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableContacts);
