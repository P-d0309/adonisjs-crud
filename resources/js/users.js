$(document).on("click", ".btn-delete-user", function () {
	const id = $(this).data("id");
	const deleteUserRoute = stardust.route("auth.users.destroy", { id: id });

	Swal.fire({
		icon: "info",
		title: "Are you sure !",
		text: "You want to remove this user from the system ?",
		showCancelButton: true,
		confirmButtonText: "Yes Please !",
		showLoaderOnConfirm: true,
		preConfirm: async () => {
			return await axios.delete(deleteUserRoute);
		},
		allowOutsideClick: () => !Swal.isLoading(),
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				icon: "success",
				title: "User has been delete successfully.",
				confirmButtonText: "Ok",
				allowOutsideClick: false,
			}).then((result) => {
				if (result.isConfirmed) {
					location.reload();
				} else if (result.isDenied) {
				}
			});
		}
	});
});
