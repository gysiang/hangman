SELECT * FROM "games" INNER JOIN "difficulties" ON "games"."difficulty_id" = "difficulties"."id" WHERE "games"."id"=1;

const game = await db.Game.findOne{(
  include: [{
      model: db.Difficulty,
      where: {
        id: { [Op.ne]: gameID }
      }
  }]
)}
