const milestones = [
  {
    year: "2020",
    event: "Platform Launched",
    description:
      "We launched our platform with a vision to make sports facility booking easier.",
  },
  {
    year: "2021",
    event: "1,000+ Venues Added",
    description:
      "We expanded our network to include over 1,000 sports venues across the country.",
  },
  // Add more milestones as needed
];

const HistoryMilestones = () => {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our History & Milestones
      </h2>
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 text-center md:text-right mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">{milestone.year}</h3>
            </div>
            <div className="md:w-3/4 md:pl-8">
              <h4 className="text-lg font-bold">{milestone.event}</h4>
              <p className="text-gray-600">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryMilestones;
