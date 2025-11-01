import { ReviewGET, TaskGET } from "@/types"


//  расчеты оценки исходя из фитбеков ******************************************************************************************

// 2-12
function getNormalScorePerf(score: number): 0 | 1 | 2 | 3 {
  if ( 10 <= score ) return 3
  else if ( 6 <= score ) return 2
  else return 1
}


const [ SELF, LEAD, COLLEAGUE ] = ['self', 'lead', 'colleague']


function getSumPerfomanceTargets(review: ReviewGET): number {
  if (review.feedbacks?.length && review.tasks?.length ){
    let targetCoefficientSum = 0
    let perfomanceTargets = 0
    
    for (let task of review.tasks) {
      const [perf, coefficient] = getSumPerfomanceTarget(task)
      perfomanceTargets += perf
      targetCoefficientSum += coefficient
    }
    perfomanceTargets = perfomanceTargets / ( targetCoefficientSum || 1)
    return perfomanceTargets
  }
  return 0
}

function getSumPerfomanceTarget(task: TaskGET): number[] { 

  // const feedbacks = task.feedbacks || []
  // const feedbacksSelf = task.feedbacks?.filter(f => f.typeAuthor === SELF) || []

  const feedbacksLead = task.feedbacks?.filter(f => f.typeAuthor === LEAD) || []
  const perfomanceLead = feedbacksLead.at(-1)?.perfomance || 0
  
  const feedbacksColleague = task.feedbacks?.filter(f => f.typeAuthor === COLLEAGUE) || []
  let perfomanceTargetColleague = 0
  for (let f of feedbacksColleague){
    perfomanceTargetColleague += ( f.perfomance || f.result || 0 )
  }

  // return [perf, coefficient]
  return [
    ( perfomanceLead + (perfomanceTargetColleague / feedbacksColleague.length)) * ( task.coefficient || 1) ,
    ( task.coefficient || 1)
  ]
}

export function getSumPerfomance(review: ReviewGET): 0 | 1 | 2 | 3 {
  if (review.feedbacks?.length && review.tasks?.length ){
    // TODO ? передеклать чтобы считал среднюю по всем начальникам ?
    const perfomanceFeedback = review.feedbacks.at(-1)?.potential || 0
    console.log('perfomanceFeedback', perfomanceFeedback)

    const perfomanceTargets = getSumPerfomanceTargets(review)
    console.log('perfomanceTargets', perfomanceTargets)
    
    const potentialSum = perfomanceFeedback + perfomanceTargets
    console.log('potentialSum', potentialSum, ' /12')

    return getNormalScorePerf(potentialSum)
  } else {
    return 0
  }
}



export function getSumPotential(review: ReviewGET): 0 | 1 | 2 | 3 {
  if (review.feedbacks?.length){
    // TODO ? передеклать чтобы считал среднюю по всем начальникам ?
    const potential = review.feedbacks.at(-1)?.potential || 0
    console.log('potential', potential, ' /12')
    return getNormalScorePot(potential)
  } else {
    return 0
  }
}

// 0-12
function getNormalScorePot(score: number): 0 | 1 | 2 | 3 {
  if ( 9 <= score ) return 3
  else if ( 5 <= score ) return 2
  else return 1
}
