const Course = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;

    return <div>Course id {id}</div>;
}

export default Course;