$(function() { 
  function addUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
}

  function addNoUser() {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    var html = `
    <div class="ChatMember clearfix" id="${id}">
      <p class="ChatMember__name">${name}</p>
      <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".ChatMembers").append(html);
  }
  function addMember(userId) {
    var html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#uer-search-result").empty();

        if (users.length !== 0) {
            users.forEach(function(user) {
              addUser(user);
            });
          }else if (input.length ==0){
            return false;
          }else { 
            addNoUser();
          }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
});
  $(document).on("click", ".chat-group-user__btn--add", function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("date-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-groupe-user__btn--remove", function(){
    $(this)
      .parent()
      .remove();
  });
});