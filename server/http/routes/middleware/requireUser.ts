export const requireUser = async (req: any, res: any, next: any) => {
	console.log("Reached: requireUser");
	if (req.user_id === null) {
		res.status(400).json({
			message: "User is required.",
		});
		console.log("returning from requireUser");
		return;
	}
	try {
		next();
	} catch (err) {
		console.log(err);
	}
};
