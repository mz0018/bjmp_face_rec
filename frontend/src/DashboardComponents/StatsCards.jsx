const StatsCards = ({ totalStudents = 0, presentToday = [], absentStudents = 0 }) => {
  const cards = [
    {
      title: "Total Visitors",
      value: totalStudents,
      color: "text-[#0033A0]", 
      bg: "bg-[#D4AF37]/10",
    },
    {
      title: "Visitors Present Today",
      value: presentToday.length,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Visitors Absent Today",
      value: absentStudents,
      color: "text-[#CE1126]",
      bg: "bg-[#CE1126]/10",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <article
          key={idx}
          className={`p-4 rounded-lg shadow hover:shadow-md transition-shadow ${card.bg}`}
        >
          <h3 className={`text-sm font-medium mb-2 ${card.color}`}>{card.title}</h3>
          <p className="text-2xl font-bold text-gray-800">{card.value}</p>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;
