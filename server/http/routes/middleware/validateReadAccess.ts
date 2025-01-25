export const validateReadAccess = async (req: any, res: any, next: any) => {
	console.log("Reached: validateReadAccess");
	const file = req.file;
	const user_id = req.user_id;

	try {
		const admin: any = file.admin;
		const contributors: any = file.contributors;

		// if file is public - grant read access to everyone
		if (file?.public) {
			next();
			return;
		}
		// if file is private - grant read access to admins
		else if (
			admin?._id == user_id ||
			contributors.find(
				(contributor: any) => contributor._id.toString() == user_id.toString()
			) != undefined
		) {
			next();
			return;
		}
		// if file is not public(private) and user is not admin(unauthorized user) - deny read access
		else {
			res.status(400).json({
				message: "You are not authorized to view this file.",
			});
			return;
		}
	} catch (err: any) {
		console.log(err.message);
		res.status(400).json({ message: err.message });
		return;
	}
};
