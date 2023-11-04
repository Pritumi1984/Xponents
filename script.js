// Function to fetch and parse the student data from a JSON file
async function fetchStudentData() {
    try {
        const response = await fetch('student_data.json'); // Change the file path to your JSON file
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching student data:', error);
        return null;
    }
}

// Function to update student information and progress
async function updateStudentInfoAndProgress() {
    const studentData = await fetchStudentData();
    if (!studentData) {
        return;
    }

    const studentNameInput = document.getElementById('studentNameInput').value;

    // Find the student by name
    const student = studentData.student.find(student => student.name === studentNameInput);

    if (!student) {
        // Clear any previous error message
        document.getElementById('degreeProgressStatusMessage').textContent = '';
        return;
    }

    // Update student information
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('programOfStudy').textContent = student.programOfStudy;
    document.getElementById('creditsCompleted').textContent = student.creditsCompleted;
    document.getElementById('campus').textContent = student.campus;
    document.getElementById('faculty').textContent = student.faculty;

    // Update progress based on the student's name
    const progress = studentData.progress.find(progress => progress.name === student.name);
    if (progress) {
        // Update overall progress
        const overallProgress = (progress.overallProgress * 100).toFixed(2);
        document.getElementById('overallProgress').value = overallProgress;

        // Update general education progress
        const selectedRequirement = document.getElementById('genEdSelect').value;
        document.getElementById('genEdProgress').value = progress.genEdProgress[selectedRequirement];

        // Update major progress
        const selectedYear = document.getElementById('majorYearSelect').value;
        document.getElementById('majorProgress').value = progress.majorProgress[selectedYear];
    }
}

// Event listener for the "Fetch Degree Status" button
document.getElementById('fetchDataButton').addEventListener('click', updateStudentInfoAndProgress);

// Event listener for the "Select Requirement" dropdown
document.getElementById('genEdSelect').addEventListener('change', updateStudentInfoAndProgress);

// Event listener for the "Select Year" dropdown
document.getElementById('majorYearSelect').addEventListener('change', updateStudentInfoAndProgress);
