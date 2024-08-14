import styles from "./About.module.css";
import { PaperClipOutlined, InfoCircleOutlined } from "@ant-design/icons";

const About = () => {
  return (
    <div
      className="bacgroundWraoer"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/life_style_working_11.svg)`,
      }}
    >
      <section>
        <h1 className="headerMain">
          <span>
            <InfoCircleOutlined className="infoIcon" />
          </span>
          About
        </h1>
        <div className={styles.description}>
          <p>
            Welcome to&nbsp;
             <strong className={styles.strong}>Job-Search-Tracker</strong> - Your
            Ultimate Job Search and Interview Preparation Companion!
          </p>
          <p>
            At&nbsp;<strong className={styles.strong}>Job-Search-Tracker</strong>, we
            understand that the job search and interview process can be both
            exciting and challenging. That's why we've created a comprehensive
            application to assist you every step of the way.
          </p>
        </div>
      </section>
      <div className={styles.contein}>
        <section>
          <h3 className={styles.sectionHeader}>Features:</h3>
          <ol>
            <li>
              <h4>Job Application Tracker:</h4>
              <ul>
                <li>
                  Easily manage your job applications through our intuitive card
                  system.
                </li>
                <li>
                  Create personalized cards for each job application, including
                  company name, position, application deadline, current status,
                  and to-do lists related to the specific job opportunity.
                </li>
                <li>
                  Visualize your job application journey, keeping track of the
                  number of applications submitted and the feedback received.
                </li>
              </ul>
            </li>

            <li>
              <h4>Statistics Dashboard:</h4>
              <ul>
                <li>
                  Gain insights into your job search progress with our
                  Statistics Dashboard.
                </li>
                <li>
                  Track your application success rate, response times, and
                  overall performance.
                </li>
                <li>
                  Make data-driven decisions to enhance your job search
                  strategy.
                </li>
              </ul>
            </li>

            <li>
              <h4>Interview Preparation:</h4>
              <ul>
                <li>
                  Prepare for success with our Interview Preparation section.
                </li>
                <li>
                  Create and practice potential interview questions tailored to
                  the positions you're applying for.
                </li>
                <li>
                  Sharpen your skills and boost your confidence before the big
                  day.
                </li>
              </ul>
            </li>
          </ol>
        </section>
        <section>
          <h3 className={styles.sectionHeader}>How It Works:</h3>
          <ol>
            <li>
              <h4>Job Application Tracking:</h4>
              <ul>
                <li>Navigate to the "Applications" page.</li>
                <li>
                  Create a new card for each job application, providing key
                  details.
                </li>
                <li>
                  Stay organized with a visual representation of your
                  application pipeline.
                </li>
              </ul>
            </li>

            <li>
              <h4>Statistics Dashboard:</h4>
              <ul>
                <li>
                  Explore the "Statistics" page to analyze your job search data.
                </li>
                <li>
                  Identify patterns, strengths, and areas for improvement.
                </li>
                <li>Optimize your approach based on real-time statistics.</li>
              </ul>
            </li>

            <li>
              <h4>Interview Preparation:</h4>
              <ul>
                <li>
                  Access the "Interviews" page to create and practice interview
                  questions.
                </li>
                <li>
                  Simulate real interview scenarios to enhance your
                  communication and problem-solving skills.
                </li>
              </ul>
            </li>
          </ol>
        </section>
        <section>
          <p>
            <strong className={styles.strong}>Job-Search-Tracker</strong> is
            here to empower you on your career journey. Whether you're actively
            job hunting or proactively managing your professional development,
            our user-friendly interface and robust features are designed to make
            your experience seamless and effective.
          </p>
          <p>
            Download{" "}
            <strong className={styles.strong}>Job-Search-Tracker</strong> today
            and take control of your career path!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
