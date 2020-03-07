import { types, onSnapshot } from "mobx-state-tree";
// https://egghead.io/lessons/react-describe-your-application-domain-using-mobx-state-tree-mst-models
const Player = types
  .model("PlayerModel", {
    active: types.boolean,
    name: types.string,
    amountOfGames: types.number,
    going: types.optional(types.boolean, false),
    scores: types.array(types.number)
  })
  .views(self => ({
    get totalScore() {
      return self.scores.reduce((acc, currScore) => acc + currScore);
    }
  }))
  .actions(self => ({
    addScore(score: number) {
      self.scores.push(score);
    }
  }));

const Game = types
  .model("Game", {
    players: types.array(Player)
  })
  .actions(self => ({
    addPlayers(players: string[]) {
      self.players.replace(
        players.map(p =>
          Player.create({
            scores: [],
            name: p,
            going: false,
            active: true,
            amountOfGames: 0
          })
        )
      );
    }
  })).views(self => ({
    get goingPlayers() {
      return self.players.filter(p => p.going);
    }
  }))
  const game = Game.create();

const Ronde = types.model("Rondes", {});

// player1.addScore(1);
// const score = player1.totalScore;
