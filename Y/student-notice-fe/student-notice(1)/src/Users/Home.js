
import React from "react";
import classes from "./Home.module.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
const Home = () => {
  return (
    <div>
      <div className={classes.login}></div>
      <div>
        <div className={classes.text}>
          <h1>Welcome to Smith school</h1>
          <div>
            <span>We focus on learning, We respect ourselves and others.</span>
            <div>
              <span>
                Education is our passport to the future for tomorrow belongs to
                the people who prepare for it today.
              </span>
              <span>
                Education is a commitment to excellence in Teaching and
                Learning.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.main}>
        <h1 className={classes.textCenter}>The Smith School</h1>
        <div className={classes.row} style={{ display: "flex" }}>
          <div style={{ width: "50%", margin: "40px" }}>
            <div className={classes.feature}>
              <i class="fa fa-group">
                <ContactSupportIcon style={{ fontSize: "100px" }} />
              </i>
              <h4>Mission</h4>
              <p>
                - To become a globally recognized premier educational pilgrimage
                for its excellence in academics.
              </p>
            </div>
          </div>
          <div style={{ width: "50%", margin: "40px" }}>
            <div className={classes.feature}>
              <i class="fa fa-group">
                <SupervisorAccountIcon style={{ fontSize: "100px" }} />
              </i>
              <h4>Vision</h4>
              <p>
                - To create and sustain professional research and knowledge
                based services to academic and community.
              </p>
            </div>
          </div>
        </div>
        <div className={classes.feature}>
          <h1 className={classes.textCenter}>Welcome to The Smith School</h1>
          <p className={classes.text2}>
            Babu Madhav Institute of Information Technology, popularly known as
            BMIIT is premier institute of Uka Tarsadia University which offers
            two courses of Three Years Bachelor of Science in Information
            Technology B.Sc. (IT) and Five Years Integrated Masters of Science
            in Information Technology; and named after its beloved donor
            respected Shri Babubhai Madhavbhai Patel a great human being and
            renowned businessman from USA.
            <br />
            At The Smith school we focus on holistic development of student. We not only
            insist on academic growth of the students but we cultivate moral
            values and ethics among them which help them to lead a successful
            life, both professional and personal. The same can be reflected in
            the tagline of The Smith School - Make it happen through innovation and values.
            <br />
            At The Smith School we are following an advanced curriculum, and again it is
            updated time to time according to the demanding needs of the IT
            industry. By adhering to the UGC standards of curriculum, we at
            The Smith School follows CBCS (Choice Based Credit System) based curriculum
            whilst incorporating subjects that result into holistic academic
            curriculum.
            <br />
            The Smith School is furnished with state of the art infrastructure. All class
            rooms are equipped with projector, Wi-Fi access. Laboratories are
            also equipped with around 200 high configuration computers and audio
            visual tools to provide better learning environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
