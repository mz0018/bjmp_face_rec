const StatsCards = ({ totalStudents, presentToday, absentStudents }) => (
    <section>
        <article>
            <h2>Total Students</h2>
            <p>{totalStudents}</p>
        </article>
        <article>
            <h2>Students Present Today</h2>
            <p>{presentToday.length}</p>
        </article>
        <article>
            <h2>Students Absent Today</h2>
            <p>{absentStudents}</p>
        </article>
    </section>
);

export default StatsCards;
