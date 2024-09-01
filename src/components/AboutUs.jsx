import MissionStatement from "./MissionStatement";
import TeamSection from "./TeamSection";
import HistoryMilestones from "./HistoryMilestones";
import ContactInformation from "./ContactInformation";

const AboutUs = () => {
  return (
    <div className="container mx-auto my-10">
      <MissionStatement />
      <TeamSection />
      <HistoryMilestones />
      <ContactInformation />
    </div>
  );
};

export default AboutUs;
