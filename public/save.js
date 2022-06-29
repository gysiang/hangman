    async sendWord(req,res) {
      const { gameID } = req.cookies;
      try {
        const word = await this.model.findOne(
        { 
          where: {  id : gameID },
          attributes: ['chosen_word'],
          raw:true,
        })
        const data = {
          word: (word.chosen_word),
        }
        console.log('word is',data);
        res.send(data);
      } catch(error){
        console.log(error);
      }
  }