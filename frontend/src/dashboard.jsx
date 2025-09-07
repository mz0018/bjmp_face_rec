import Sidebar from "./DashboardComponents/Sidebar";
import StatsCards from "./DashboardComponents/StatsCards";
import AttendanceTable from "./DashboardComponents/AttendanceTable";
import ManualAttendanceForm from "./DashboardComponents/ManualAttendanceForm";
import useDashboardHook from "./hooks/useDashboardHook";

const Dashboard = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const {
        presentToday,
        totalStudents,
        absentStudents,
        currentAttendance,
        courseList,
        selectedCourse,
        setSelectedCourse,
        currentPage,
        paginate,
        filteredAttendance,
        handleManualAttendance
    } = useDashboardHook(API_URL);

    return (
        <main className="min-h-screen flex bg-gray-100">
            <Sidebar className="w-64 hidden lg:block" />

            <section className="flex-1 p-6">
                <header className="mb-6">
                    <p className="text-sm text-gray-500">Pages / Dashboard</p>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                </header>

                <StatsCards
                    totalStudents={totalStudents}
                    presentToday={presentToday}
                    absentStudents={absentStudents}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
                />

                <AttendanceTable
                    currentAttendance={currentAttendance}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                    courseList={courseList}
                    currentPage={currentPage}
                    paginate={paginate}
                    filteredAttendance={filteredAttendance}
                    className="bg-white rounded-lg shadow p-4 mb-6"
                />

                <ManualAttendanceForm
                    handleManualAttendance={handleManualAttendance}
                    className="bg-white rounded-lg shadow p-4 mb-6"
                />

                <footer className="text-center text-sm text-gray-500 mt-6">
                    © 2025, BJMP Visitors Biometrics
                </footer>
            </section>
        </main>
    );
};

export default Dashboard;
