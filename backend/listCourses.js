exports.handler = async (event) => {
    // Dummy course list
    const courses = [
        { courseId: "c1", title: "Cloud Computing Basics", uploadedBy: "teacher1" },
        { courseId: "c2", title: "AWS Free Tier Workshop", uploadedBy: "teacher2" }
    ];

    return {
        statusCode: 200,
        body: JSON.stringify({ courses }),
    };
};
