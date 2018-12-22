class Emailer {
  load() {

  }

  render() {

  }

  send(opt) {
    const { mailName, ...info } = opt
    const mailContent = this.render(mailName, info)
    console.log(mailContent)
  }
}

const emailController = new Emailer()
module.exports = emailController