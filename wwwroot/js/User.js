var dataTable;

$(document).ready(function () {
    loadDataTable();
});


function loadDataTable() {
    dataTable = $("#tblData").DataTable({
        "ajax": {
            "url": "/Admin/User/GetAll"
        },
        "columns": [
            { "data": "name" },
            { "data": "email" },
            { "data": "phoneNumber" },
            { "data": "company.name" },
            { "data": "role" },
            {
                "data": {
                    id: "id",
                    lockoutEnd: "lockoutEnd"
                },
                "render": function (data) {
                    var today = new Date().getTime();
                    var lockout = new Date(data.lockoutEnd).getTime();

                    if (lockout > today) {
                        // user is locked
                        return `
                            <div class="text-center">
                                <a onclick="LockUnlock('${data.id}')" class="btn btn-danger text-white">
                                    <i class="fas fa-lock-open"></i> Unlock
                                </a>
                            </div>
                        `;

                    } else {
                        // not locked
                        return `
                            <div class="text-center">
                                <a onclick="LockUnlock('${data.id}')" class="btn btn-success text-white">
                                    <i class="fas fa-lock"></i> Lock
                                </a>
                            </div>
                        `;
                    }
                }
            }
        ]
    });
}

function Delete(url) {
    swal({
        title: "Are you sure you want to  Delete?",
        text: "You will not be able to restore the data!",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    }));
}

function LockUnlock(id) {

    $.ajax({
        type: "POST",
        url: "/Admin/User/LockUnlock",
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                dataTable.ajax.reload();
            }
            else {
                toastr.error(data.message);
            }
        }
    });

}