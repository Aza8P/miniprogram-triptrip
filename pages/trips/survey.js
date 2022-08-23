// pages/trips/survey.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    resetForm: true,
    tripId:  126, // testing only
    yes:'/images/minus-2.png',
    no:'/images/addsurvey.png',
    questions: {
      "room": {name: "Room type", active: false},
      "food": {name: "Food preference", active: false},
      "pickup": {name: "Do you need pick up?", active: false}
    },

    finalSurvey : ['','',''],
    // This is a data structure example to build while submitting to the back end.
    questionsToSubmit: [
      {
        "content": "What room type do you want to live in?",
        "question_type": "single-choice",
        "options": [
          "Private Room",
          "Shared Room",
          "no preference"
        ],
      },
      {
        "content": "Dietary requirements?",
        "question_type": "single-choice",
        "options": [
          "Vegetarian",
          "Vegan",
          "None"
        ]
      },
      {
        "content": "Do you need pick up?",
        "question_type": "single-choice",
        "options": [
          "Yes",
          "No"
        ]
      }
    ]
  },

  resetForm() {
    this.setData({formData: {}})
  },

  selectQuestion(e) {
    console.log("toggle questions:", e)
    const page = this
    // const tag = e.currentTarget.dataset.tag

    const { tag, index } = e.currentTarget.dataset
    // console.log("toggle questions ", tag)
    let questions = page.data.questions
    // questions[tag].active = !questions[tag].active
    page.setData({questions})
    // const index = e.currentTarget.dataset.index
    // let finalSurvey = page.data.finalSurvey
    // const questionsToSubmit = page.data.questionsToSubmit

    let { finalSurvey, questionsToSubmit } = page.data
    if (!questions[tag].active) {
      // if its inactive -> make it active -> add it to finalSurvey
      questions[tag].active = true
      finalSurvey[index] = questionsToSubmit[index]
      page.setData({finalSurvey, questions})
    } else {
      // if its active -> removing from finalSurvey -> make inactive
      finalSurvey[index] = ''
      questions[tag].active = false
      page.setData({finalSurvey, questions})
    }
    console.log(page.data)
  },
 
  // this page is not a usual form. maybe it's better to use custom function rather than form-type="submit" functions. replace
  submitSurveyCustom(){
    let page = this
    console.log(page.data.finalSurvey)
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/trips/${page.data.tripId}/survey`,
      method: "POST",
      data: {
        "trip_id": page.data.tripId,
        // finalSurvey
        "questions": page.data.finalSurvey
        // "questions": finalSurvey
      },
      success(res) {
        console.log("From survey.js - submitSurveyCustom: res",res)
        wx.switchTab({
          url: '/pages/users/profile',
        })
        // if (res.statusCode === 201) {
        // }
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    // TODO: 
    // need to page.setData tripId when first load
    console.log('survey onShow')
    const page = this
    const tripId = wx.getStorageSync('id')
    
    // if (tripId) {
    //   console.log('id found -> update')
    //   wx.request({
    //     header: app.globalData.header,
    //     url: `${app.globalData.baseURL}/trips/${page.data.tripId}/survey`,
    //     success(res) {
    //       page.setData({
    //         formData: res.data,
    //         id: tripId
    //       })
    //       wx.removeStorageSync('id')
    //     }
    //   })
    // }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  goToHome() {
    wx.switchTab({
      url: 'landing',
    })
  },

  goToForm(e) {
    console.log('From survey.js - goToFrom: e', e)
    wx.navigateTo({
        url: `/pages/trips/form`,
      })
  }
})