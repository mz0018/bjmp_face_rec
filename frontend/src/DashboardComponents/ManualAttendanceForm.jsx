const ManualAttendanceForm = ({ handleManualAttendance }) => {
    const submit = () => {
        const data = {
            name: document.querySelector('input[name="manual_name"]').value,
            usn: document.querySelector('input[name="manual_usn"]').value,
            course: document.querySelector('input[name="manual_course"]').value,
            recognizedAt: document.querySelector('input[name="recognizedAt"]').value,
        };
        handleManualAttendance(data);
    };

    return (
        <section>
            <h2>Add Attendance Manually</h2>
            <form>
                <input type="text" name="manual_name" placeholder="Enter student's name" />
                <input type="text" name="manual_usn" placeholder="Enter student's USN" />
                <input type="text" name="manual_course" placeholder="Enter student's course" />
                <input type="datetime-local" name="recognizedAt" />
                <button type="button" onClick={submit}>Mark Attendance</button>
            </form>
        </section>
    );
};

export default ManualAttendanceForm;
