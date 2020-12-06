

const getTotalRequestsPerType1 = ({creation_date, completion_date}, user) => ({
    query: () =>  ({
        text: "select * from get_total_requests_per_type_1($1, $2)",
        values: [creation_date, completion_date]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 1`]
    })
});

const getTotalRequestsPerDate2 = ({type_of_service, creation_date_start, creation_date_end}, user) => ({
    query: () =>  ({
        text: "select * from get_total_requests_per_date_2($1, $2, $3)",
        values: [type_of_service, creation_date_start, creation_date_end]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 2`]
    })
});

const getMostCommonServicePerZip3 = ({creation_date}, user) => ({
    query: () =>  ({
        text: "select * from most_common_service_per_zip3($1)",
        values: [creation_date]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 3`]
    })
});

const getAvgCompletionTimePerType4 = ({creation_date, completion_date}, user) => ({
    query: () =>  ({
        text: "select * from avg_completion_time_per_type4($1, $2)",
        values: [creation_date, completion_date]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 4`]
    })
});

const getMostCommonTypeInBox5 = ({creation_date, top_left_point, bottom_right_point}, user) => ({
    query: () =>  ({
        text: "select * from most_common_type_in_box5($1, $2, $3, $4, $5)",
        values: [creation_date, top_left_point.lat, top_left_point.lon, bottom_right_point.lat, bottom_right_point.lon]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 5`]
    })
});


const getTop5ssa6 = ({creation_date, completion_date}, user) => ({
    query: () =>  ({
        text: "select * from top5ssa6($1, $2)",
        values: [creation_date, completion_date]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 6`]
    })
});

const getLicensePlateMoreThanOnce7 = (user) => ({
    query: () =>  ({
        text: "select * from license_plate_more_than_once7()",
        values: []
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 7`]
    })
});

const getSecondCommonColor8 = (user) => ({
    query: () =>  ({
        text: "select * from second_common_color8()",
        values: []
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 8`]
    })
});


const getPremisesBaited9 = ({upper_bound}, user) => ({
    query: () =>  ({
        text: "select * from premises_baited9($1)",
        values: [upper_bound]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 9`]
    })
});


const getPremisesGarbage10 = ({upper_bound}, user) => ({
    query: () =>  ({
        text: "select * from premises_garbage10($1)",
        values: [upper_bound]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 10`]
    })
});

const getPremisesRats11 = ({upper_bound}, user) => ({
    query: () =>  ({
        text: "select * from premises_rats11($1)",
        values: [upper_bound]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 11`]
    })
});

const getPolicesDistrictsWithPotRodent12 = ({creation_date}, user) => ({
    query: () =>  ({
        text: "select * from police_districts_with_pot_rodent12($1)",
        values: [creation_date]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 12`]
    })
});



module.exports = {
    getTotalRequestsPerType1,
    getTotalRequestsPerDate2,
    getMostCommonServicePerZip3,
    getAvgCompletionTimePerType4,
    getMostCommonTypeInBox5,
    getTop5ssa6,
    getLicensePlateMoreThanOnce7,
    getSecondCommonColor8,
    getPremisesBaited9,
    getPremisesGarbage10,
    getPremisesRats11,
    getPolicesDistrictsWithPotRodent12

};