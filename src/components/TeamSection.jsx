const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    bio: "John is the visionary behind the platform, with over 10 years of experience in the sports industry.",
    image: "path-to-johns-image.jpg",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    bio: "Jane leads our technology team, ensuring our platform runs smoothly and efficiently.",
    image: "path-to-janes-image.jpg",
  },
  // Add more team members as needed
];

const TeamSection = () => {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-blue-500">{member.role}</p>
            <p className="text-gray-600 mt-2">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
