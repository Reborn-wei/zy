<template>
  <el-card>
    <MyBread firstnav="商品管理" lastnav="商品列表"/>
    <el-alert class="myalert" title="添加商品信息" type="info" center show-icon></el-alert>
    <el-steps class="mystep" :active="active" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs @tab-click="tabclick" tab-position="left">
      <el-tab-pane label="基本信息">
        <el-form label-position="top" :model="addObj" status-icon class="demo-ruleForm">
          <el-form-item label="商品名称">
            <el-input type="text" v-model="addObj.goods_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input type="text" v-model="addObj.goods_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addObj.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addObj.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            {{ cascaderValue }}
            <el-cascader
              :props="props"
              expand-trigger="hover"
              :options="cateList"
              v-model="cascaderValue"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <div v-for="item in manyParams" :key="item.attr_id">
          <p>{{item.attr_name}}</p>
          <div>
            <el-checkbox
              v-model="check"
              v-for="(item1,index) in item.attr_vals.split(',')"
              :key="index"
              :label="item1"
              border
            ></el-checkbox>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <div class="my-form" v-for="item in onlyParams" :key="item.attr_id">
          <p>{{item.attr_name}}</p>
          <div>
            <input type="text" v-model="item.attr_vals">
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        {{ addObj.pics }}
        <el-upload
          :on-preview="uploadpreview"
          :on-remove="uploadremove"
          :on-success="uploadsuccess"
          :headers="headers"
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <el-button @click="add">新增数据</el-button>
        <quill-editor v-model="goods_introduce" ref="myQuillEditor"></quill-editor>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="图片预览" :visible.sync="previewDialog">
      <img class="myimg" ref="myImg" src="#">
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      check: true,
      active: 0,
      addObj: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: []
      },
      cascaderValue: [],
      cateList: [],
      props: {
        label: "cat_name",
        value: "cat_id"
      },
      manyParams: [],
      onlyParams: [],
      headers: {
        Authorization: window.localStorage.getItem("token")
      },
      previewDialog: false
    };
  },
  methods: {
    async add() {
      var cates = this.cascaderValue.join(",");
      this.addObj.goods_cat = cates;
      var res = await this.$http.post("/goods", this.addObj);
      var meta = res.data.meta;
      if (meta.status === 201) {
        this.$router.push("/goods");
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message.error(meta.msg);
      }
    },

    uploadsuccess(response, file, fileList) {
      if (file.status === "success") {
        this.addObj.pics.push(response.data.tmp_path);
        this.$message({
          message: file.response.meta.msg,
          type: "success"
        });
      } else {
        this.$message.error("上传出错啦");
      }
    },

    uploadremove(file, fileList) {
      for (var i = 0; i < this.addObj.pics.length; i++) {
        if (this.addObj.pics[i] === file.response.data.tmp_path) {
          this.addObj.pics.splice(i, 1);
          this.$message({
            message: "移除成功",
            type: "success"
          });
          break;
        }
      }
    },

    uploadpreview(file) {
      this.previewDialog = true;

      this.$nextTick(function() {
        this.$refs.myImg.src = file.response.data.url;
      });
    },
    tabclick(ev) {
      this.active = Number(ev.index);
      if (ev.index === "1") {
        this.getParams("many");
      }
      if (ev.index === "2") {
        this.getParams("only");
      }
    },

    async getAllCate() {
      var res = await this.$http.get("/categories?type=3");
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.cateList = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    async getParams(sel) {
      if (this.cascaderValue.length != 0) {
        var id = this.cascaderValue[this.cascaderValue.length - 1];
        var res = await this.$http.get(
          `/categories/${id}/attributes?sel=${sel}`
        );
        var { meta, data } = res.data;
        if (meta.status === 200) {
          if (sel === "many") {
            this.manyParams = data;
          } else {
            this.onlyParams = data;
          }
        } else {
          this.$message.error(meta.msg);
        }
      } else {
        this.$message.error("参数不能为空");
      }
    }
  },
  mounted() {
    this.getAllCate();
  }
};
</script>

<style>
.myalert {
  margin-top: 15px;
  margin-bottom: 15px;
}

.el-step__title {
  font-size: 12px;
}

.my-form {
  margin: 10px 0px;
}

.my-form input {
  width: 99%;
  height: 25px;
  margin-top: 10px;
}

.myimg {
  width: 100%;
}
div#pane-4 {
  height: 500px;
}
.quill-editor {
  height: 400px;
}
</style>
