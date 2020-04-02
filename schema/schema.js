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
const User = require("../models/user.model.js");
const Like = require("../models/like.model");
const MuscleGroup = require("../models/muscleGroup.model");
const EnrolledProgram = require("../models/enrolledProgram.model");
const Category = require("../models/category.model");
const Equipment = require("../models/equipment.model");
const Goal = require("../models/goal.model");

const TrainerType = new GraphQLObjectType({
  name: "Trainer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
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
    category: { type: GraphQLString },
    objective: { type: GraphQLString },
    duration: { type: GraphQLString },
    experienceLevel: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },

    trainer: {
      type: TrainerType,
      resolve(parent, args) {
        return Trainer.findById(parent.trainerID);
      }
    }
    // days: {
    //   type: new GraphQLList(DayType),
    //   resolve(parent, args) {
    //     Day.find({ programID: parent.id });
    //   }
    // }
  })
});

// const DayType = new GraphQLObjectType({
//   name: "Day",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     overview: { type: GraphQLString },
//     coverPhoto: { type: GraphQLString },

//     program: {
//       type: ProgramType,
//       resolve(parent, args) {
//         return Program.findById(parent.programID);
//       }
//     },
//     exercises: {
//       type: new GraphQLList(ExerciseType),
//       resolve(parent, args) {
//         Exercise.find({ dayID: parent.id });
//       }
//     },
//     category: {
//       type: CategoryType,
//       resolve(parent, args) {
//         return Category.findById(parent.categoryID);
//       }
//     }
//   })
// });

// const ExerciseType = new GraphQLObjectType({
//   name: "Exercise",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     overview: { type: GraphQLString },
//     reps: { type: GraphQLString },
//     sets: { type: GraphQLString },
//     time: { type: GraphQLInt },
//     tips: { type: GraphQLString },
//     coverPhoto: { type: GraphQLString },
//     video: { type: GraphQLString },
//     videoURL: { type: GraphQLString },

//     day: {
//       type: DayType,
//       resolve(parent, args) {
//         return Day.findById(parent.dayID);
//       }
//     },
//     equipment: {
//       type: EquipmentType,
//       resolve(parent, args) {
//         return Equipment.findById(parent.equipmentID);
//       }
//     },
//     muscleGroup: {
//       type: MuscleGroupType,
//       resolve(parent, args) {
//         return MuscleGroup.findById(parent.muscleGroupID);
//       }
//     }
//   })
// });

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     age: { type: GraphQLInt },
//     sex: { type: GraphQLString },
//     sportsPlayed: { type: GraphQLString },
//     experienceLevel: { type: GraphQLString },
//     picture: { type: GraphQLString },
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },

//     programs: {
//       type: new GraphQLList(ProgramType),
//       resolve(parent, args) {
//         const enrolled = EnrolledProgram.find({ userID: parent.id });
//         const programs = enrolled.forEach(enrolledObj =>
//           Program.findById(enrolledObj.programID)
//         );
//         return programs;
//       }
//     },
//     likes: {
//       type: new GraphQLList(LikeType),
//       resolve(parent, args) {
//         const likes = Like.find({ userID: parent.id });
//         const liked = likes.forEach(likedObj =>
//           Like.findById(likedObj.programID)
//         );
//         return liked;
//       }
//     },
//     goals: {
//       type: GoalType,
//       resolve(parent, args) {
//         const goalsObj = Goal.find({ userID: parent.id });
//         return goalsObj.goal;
//       }
//     }
//   })
// });

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

// const MuscleGroupType = new GraphQLObjectType({
//   name: "MuscleGroup",
//   fields: () => ({
//     id: { type: GraphQLID },
//     type: { type: GraphQLString }
//   })
// });

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

// const CategoryType = new GraphQLObjectType({
//   name: "Category",
//   fields: () => ({
//     id: { type: GraphQLID },
//     description: { type: GraphQLString }
//   })
// });

// const EquipmentType = new GraphQLObjectType({
//   name: "Equipment",
//   fields: () => ({
//     id: { type: GraphQLID },
//     type: { type: GraphQLString }
//   })
// });

// const GoalType = new GraphQLObjectType({
//   name: "Goal",
//   fields: () => ({
//     id: { type: GraphQLID },
//     goal: { type: GraphQLString },

//     user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.findById(parent.userID);
//       }
//     }
//   })
// });

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
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTrainer: {
      type: TrainerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
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
          name: args.name,
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
        coverPhoto: { type: new GraphQLNonNull(GraphQLString) }
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
        program.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});