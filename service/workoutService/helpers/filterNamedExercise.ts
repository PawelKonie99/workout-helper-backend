import { IExerciseByName } from "../../../types/IWorkout.types";

export const transformNamedExercise = (allUserExerciseByName: IExerciseByName[][]) => {
    return allUserExerciseByName
        .filter((element) => {
            if (element.length > 0) {
                return element;
            }
        })
        .map((element) => element[0])
        .map((element) => {
            return {
                ...element,
                workoutData: {
                    ...element.workoutData,
                    weightQuantity: Number(element.workoutData.weightQuantity),
                    repsQuantity: Number(element.workoutData.repsQuantity),
                    seriesQuantity: Number(element.workoutData.seriesQuantity),
                },
            };
        });
};
