export const validateReadWriteAccess = async (
	req: any,
	res: any,
	next: any
) => {
	console.log("Reached: validateReadWriteAccess");
	const file = req.file;
	const user_id = req.user_id;

	try {
		const admin: any = file?.admin;
		const contributors: any = file?.contributors;

		// file is public or private - grant write access to only admins and contributors
		if (
			admin._id == user_id ||
			contributors.find(
				(contributor: any) => contributor._id.toString() == user_id.toString()
			) !== undefined
		) {
			next();
			return;
		}
		// if user is not admin (unauthorized user) - deny write access
		else {
			res.status(400).json({
				message: "You are not authorized to make changes to this file.",
			});
			return;
		}
	} catch (err: any) {
		console.log(err.message);
		res.status(400).json({ message: err.message });
		return;
	}
};
