import Entity, { entityType } from "../../../../models/Entity";

export const saveEntities = async (
	entities: Array<any>
): Promise<entityType[]> => {
	try {
		let entityList: entityType[] = [];
		for (const entity of entities) {
			const en = new Entity({
				type: entity.type,
				data: entity.data,
			});
			await en.save();
			entityList.push(en);
		}
		return entityList;
	} catch (err: any) {
		throw new Error(err);
	}
};

export const deleteEntities = async (entities: Array<any>) => {
	try {
		for (const entity of entities) {
			await Entity.findByIdAndDelete(entity._id);
		}
	} catch (err: any) {
		throw new Error(err);
	}
};
