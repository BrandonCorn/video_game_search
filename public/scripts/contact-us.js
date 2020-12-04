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
            hideModal('email-modal'); 
            genericModal('message-modal',data); 
            showModal('message-modal')
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


const hideModal = (id) => {
    $(`#${id}`).modal('hide'); 
}

const showModal = (id) => {
    $(`#${id}`).modal('show')
}

const genericModal = (id, message) => {
    $('#message-modal-container').html(
        `<div class="modal fade" id="${id}" tabindex="-1" role="dialog"
        aria-labelledby="${id}" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <i class="fas fa-check"></i>
                    <h5 class="modal-title">${message.status}</h5>
                    <button type="button" class="close" 
                        data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ${message.message}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`)
}