$('#email-modal').on('shown.bs.modal', e => {
    var myVal = $(e.relatedTarget).data('val')
    $('#receiver').val(myVal); 
})

const sendEmail = mailOptions => {
    $.ajax({
        type: 'POST', 
        url: '/send-email', 
        contentType: 'application/json', 
        data: JSON.stringify(mailOptions), 
        success: data => {
            $('.modal-body').html(`<h3 class = 'text-center> ${data} </h3>`) 
            toggleModal(); 
        }, 
        error: err => {
            $('.modal-body').html(`<h3 class = 'text-center> ${err} </h3>`)
        }
    })
}


$('#email-form').on('submit', e => {
    e.preventDefault(); 
    const inputFields = document.getElementById('email-form').elements; 
    const mailOptions = {}
    for(const input of Object.values(inputFields)){
        mailOptions[input.id] = input.value
    }
    
    sendEmail(mailOptions)
})


const toggleModal = () => {
    $('#email-modal').modal('hide'); 
}