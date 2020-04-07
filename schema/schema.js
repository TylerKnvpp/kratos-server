const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require("lodash");

const Trainer = require("../models/trainer.model");
const Program = require("../models/program.model");
const Day = require("../models/day.model");
const Exercise = require("../models/exercise.model");
const MuscleGroup = require("../models/muscleGroup.model");
const Category = require("../models/category.model");
const Equipment = require("../models/equipment.model");
const Goal = require("../models/goal.model");
const User = require("../models/user.model.js");
const EnrolledProgram = require("../models/enrolledProgram.model");
const Like = require("../models/like.model");

const TrainerType = new GraphQLObjectType({
  name: "Trainer",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    specialty: { type: GraphQLString },
    sex: { type: GraphQLString },
    gym: { type: GraphQLString },
    experience: { type: GraphQLString },
    bio: { type: GraphQLString },
    sportsPlayed: { type: GraphQLString },
    picture: { type: GraphQLString },

    programs: {
      type: new GraphQLList(ProgramType),
      resolve(parent, args) {
        return Program.find({ trainerID: parent.id });
      }
    }
  })
});

const ProgramType = new GraphQLObjectType({
  name: "Program",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    overview: { type: GraphQLString },
    objective: { type: GraphQLString },
    duration: { type: GraphQLString },
    experienceLevel: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },

    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.category);
      }
    },
    trainer: {
      type: TrainerType,
      resolve(parent, args) {
        return Trainer.findById(parent.trainerID);
      }
    },
    days: {
      type: new GraphQLList(DayType),
      resolve(parent, args) {
        return Day.find({ programID: parent.id });
      }
    }
  })
});

const DayType = new GraphQLObjectType({
  name: "Day",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    overview: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },
    programID: { type: GraphQLID },

    equipment: {
      type: EquipmentType,
      resolve(parent, args) {
        return Equipment.findById(parent.equipmentID);
      }
    },
    program: {
      type: ProgramType,
      resolve(parent, args) {
        return Program.findById(parent.programID);
      }
    },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.categoryID);
      }
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve(parent, args) {
        return Exercise.find({ dayID: parent.id });
      }
    }
  })
});

const ExerciseType = new GraphQLObjectType({
  name: "Exercise",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    overview: { type: GraphQLString },
    reps: { type: GraphQLInt },
    sets: { type: GraphQLInt },
    time: { type: GraphQLInt },
    tips: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },
    video: { type: GraphQLString },
    videoURL: { type: GraphQLString },

    day: {
      type: DayType,
      resolve(parent, args) {
        return Day.findById(parent.dayID);
      }
    },
    equipment: {
      type: EquipmentType,
      resolve(parent, args) {
        return Equipment.findById(parent.equipmentID);
      }
    },
    muscleGroup: {
      type: MuscleGroupType,
      resolve(parent, args) {
        return MuscleGroup.findById(parent.muscleGroupID);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    sex: { type: GraphQLString },
    sportsPlayed: { type: GraphQLString },
    experienceLevel: { type: GraphQLString },
    picture: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },

    goal: {
      type: GoalType,
      resolve(parent, args) {
        return Goal.findById(parent.goal);
      }
    }

    // programs: {
    //   type: new GraphQLList(ProgramType),
    //   resolve(parent, args) {
    //     const enrolled = EnrolledProgram.find({ userID: parent.id });
    //     const programs = enrolled.forEach(enrolledObj =>
    //       Program.findById(enrolledObj.programID)
    //     );
    //     return programs;
    //   }
    // },
    // likes: {
    //   type: new GraphQLList(LikeType),
    //   resolve(parent, args) {
    //     const likes = Like.find({ userID: parent.id });
    //     const liked = likes.forEach(likedObj =>
    //       Like.findById(likedObj.programID)
    //     );
    //     return liked;
    //   }
    // },
  })
});

// const LikeType = new GraphQLObjectType({
//   name: "Like",
//   fields: () => ({
//     id: { type: GraphQLID },

//     exercise: {
//       type: ExerciseType,
//       resolve(parent, args) {
//         return Exercise.findById(parent.exerciseID);
//       }
//     },
//     user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.findById(parent.userID);
//       }
//     }
//   })
// });

const MuscleGroupType = new GraphQLObjectType({
  name: "MuscleGroup",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString }
  })
});

// const EnrolledProgramType = new GraphQLObjectType({
//   name: "EnrolledProgram",
//   fields: () => ({
//     id: { type: GraphQLID },

//     program: {
//       type: ProgramType,
//       resolve(parent, args) {
//         return Program.findById(parent.programID);
//       }
//     },
//     user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.findById(parent.userID);
//       }
//     }
//   })
// });

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString }
  })
});

const EquipmentType = new GraphQLObjectType({
  name: "Equipment",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString }
  })
});

const GoalType = new GraphQLObjectType({
  name: "Goal",
  fields: () => ({
    id: { type: GraphQLID },
    goal: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    trainers: {
      type: new GraphQLList(TrainerType),
      resolve(parent, args) {
        return Trainer.find({});
      }
    },
    programs: {
      type: new GraphQLList(ProgramType),
      resolve(parent, args) {
        return Program.find({});
      }
    },
    days: {
      type: new GraphQLList(DayType),
      resolve(parent, args) {
        return Day.find({});
      }
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve(parent, args) {
        return Exercise.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
      }
    },
    equipments: {
      type: new GraphQLList(EquipmentType),
      resolve(parent, args) {
        return Equipment.find({});
      }
    },
    muscleGroups: {
      type: new GraphQLList(MuscleGroupType),
      resolve(parent, args) {
        return MuscleGroup.find({});
      }
    },
    goals: {
      type: new GraphQLList(GoalType),
      resolve(parent, args) {
        return Goal.find({});
      }
    },
    trainer: {
      type: TrainerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Trainer.findById(args.id);
      }
    },
    program: {
      type: ProgramType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Program.findById(args.id);
      }
    },
    day: {
      type: DayType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Day.findById(args.id);
      }
    },
    exercise: {
      type: ExerciseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Exercise.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findById(args.id);
      }
    },
    equipment: {
      type: EquipmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Equipment.findById(args.id);
      }
    },
    muscleGroup: {
      type: MuscleGroupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return MuscleGroup.findById(args.id);
      }
    },
    goal: {
      type: GoalType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Goal.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTrainer: {
      type: TrainerType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        specialty: { type: new GraphQLNonNull(GraphQLString) },
        sex: { type: new GraphQLNonNull(GraphQLString) },
        gym: { type: new GraphQLNonNull(GraphQLString) },
        experience: { type: new GraphQLNonNull(GraphQLString) },
        bio: { type: new GraphQLNonNull(GraphQLString) },
        sportsPlayed: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString }
      },
      resolve(parent, args) {
        let trainer = new Trainer({
          firstName: args.firstName,
          lastName: args.lastName,
          age: args.age,
          specialty: args.specialty,
          sex: args.sex,
          gym: args.gym,
          experience: args.experience,
          bio: args.bio,
          sportsPlayed: args.sportsPlayed,
          picture: args.picture
        });
        return trainer.save();
      }
    },
    addProgram: {
      type: ProgramType,
      args: {
        trainerID: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        overview: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        objective: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLString) },
        experienceLevel: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString }
      },
      resolve(parent, args) {
        let program = new Program({
          trainerID: args.trainerID,
          name: args.name,
          overview: args.overview,
          category: args.category,
          objective: args.objective,
          duration: args.duration,
          experienceLevel: args.experienceLevel,
          coverPhoto: args.coverPhoto
        });
        return program.save();
      }
    },
    addDay: {
      type: DayType,
      args: {
        programID: { type: new GraphQLNonNull(GraphQLID) },
        categoryID: { type: new GraphQLNonNull(GraphQLID) },
        equipmentID: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        overview: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString }
      },
      resolve(parent, args) {
        let day = new Day({
          programID: args.programID,
          name: args.name,
          overview: args.overview,
          coverPhoto: args.coverPhoto,
          categoryID: args.categoryID,
          equipmentID: args.equipmentID
        });
        return day.save();
      }
    },
    addExercise: {
      type: ExerciseType,
      args: {
        dayID: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        overview: { type: new GraphQLNonNull(GraphQLString) },
        reps: { type: GraphQLInt },
        sets: { type: new GraphQLNonNull(GraphQLInt) },
        time: { type: GraphQLInt },
        tips: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString },
        video: { type: GraphQLString },
        videoURL: { type: GraphQLString },
        muscleGroupID: { type: new GraphQLNonNull(GraphQLID) },
        equipmentID: { type: GraphQLID }
      },
      resolve(parent, args) {
        let exercise = new Exercise({
          name: args.name,
          overview: args.overview,
          reps: args.reps,
          sets: args.sets,
          time: args.time,
          tips: args.tips,
          coverPhoto: args.coverPhoto,
          video: args.video,
          videoURL: args.videoURL,
          dayID: args.dayID,
          equipmentID: args.equipmentID,
          muscleGroupID: args.muscleGroupID
        });
        return exercise.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        sex: { type: new GraphQLNonNull(GraphQLString) },
        sportsPlayed: { type: GraphQLString },
        experienceLevel: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          age: args.age,
          sex: args.sex,
          sportsPlayed: args.sportsPlayed,
          experienceLevel: args.experienceLevel,
          picture: args.picture,
          email: args.email,
          password: args.password
        });
        return user.save();
      }
    },
    addGoalToUser: {
      type: UserType,
      args: {
        userID: { type: GraphQLNonNull(GraphQLID) },
        goalID: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let userObj = User.findOneAndUpdate({ id }, input, { new: true });

        return userObj.save();
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let category = new Category({
          description: args.description
        });
        return category.save();
      }
    },
    addEquipment: {
      type: EquipmentType,
      args: {
        type: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let equipment = new Equipment({
          type: args.type
        });
        return equipment.save();
      }
    },
    addMuscleGroup: {
      type: MuscleGroupType,
      args: {
        type: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let muscleGroup = new MuscleGroup({
          type: args.type
        });
        return muscleGroup.save();
      }
    },
    addGoal: {
      type: GoalType,
      args: {
        goal: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let goal = new Goal({
          goal: args.goal
        });
        return goal.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
