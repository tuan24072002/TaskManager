import { createSlice } from "@reduxjs/toolkit";
import { ActionSliceState } from "./state";
import { TaskModel } from "@/model/Task.model";
import { commonCreateAsyncThunk } from "./thunk";
import { TaskService } from "@/services/Task.service";
import { errorMessage } from "@/utils/utils";

interface TaskState extends ActionSliceState {
  list: TaskModel[];
  item: TaskModel;
  loading: boolean;
  stage: stageProps;
  statusStage: "idle" | "loading" | "completed" | "failed";
}

const initialState: TaskState = {
  list: [],
  item: TaskModel.initial(),
  loading: false,
  status: "idle",
  statusAction: "idle",
  action: "INS",
  stage: "todo",
  statusStage: "idle",
};

export const fetchAll: any = commonCreateAsyncThunk({
  type: "task/getAll",
  action: TaskService.getAll,
});
export const fetchItem: any = commonCreateAsyncThunk({
  type: "task/getItem",
  action: TaskService.getItem,
});
export const addItem: any = commonCreateAsyncThunk({
  type: "task/addItem",
  action: TaskService.addItem,
});
export const addSubTask: any = commonCreateAsyncThunk({
  type: "task/addSubTask",
  action: TaskService.addSubTask,
});
export const editItem: any = commonCreateAsyncThunk({
  type: "task/editItem",
  action: TaskService.editItem,
});
export const changStageItem: any = commonCreateAsyncThunk({
  type: "task/changStageItem",
  action: TaskService.editItem,
});
export const softDeleteItem: any = commonCreateAsyncThunk({
  type: "task/softDeleteItem",
  action: TaskService.softDeleteItem,
});
export const deleteItem: any = commonCreateAsyncThunk({
  type: "task/deleteItem",
  action: TaskService.deleteItem,
});
export const deleteAllItem: any = commonCreateAsyncThunk({
  type: "task/deleteAllItem",
  action: TaskService.deleteAllItem,
});
export const restoreItem: any = commonCreateAsyncThunk({
  type: "task/restoreItem",
  action: TaskService.restoreItem,
});
export const restoreAllItem: any = commonCreateAsyncThunk({
  type: "task/restoreAllItem",
  action: TaskService.restoreAllItem,
});
export const postTaskActivity: any = commonCreateAsyncThunk({
  type: "task/postTaskActivity",
  action: TaskService.postTaskActivity,
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.item = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    resetActionState: (state) => {
      state.statusAction = "idle";
    },
    resetStageState: (state) => {
      state.statusStage = "idle";
    },
    resetState: (state) => {
      state.status = "idle";
    },
    changeAction: (state, action) => {
      state.action = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        const list = TaskService.listFromJson(
          action.payload.data !== "" ? action.payload.data.data : []
        );
        state.list = list;
        state.status = "completed";
      })
      .addCase(fetchAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.status = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        const item = TaskService.itemFromJson(
          action.payload.data !== "" ? action.payload.data.data : []
        );
        state.item = item;
        state.status = "completed";
      })
      .addCase(fetchItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.status = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })

      .addCase(addItem.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(addItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(addItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(addSubTask.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(addSubTask.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(addSubTask.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.item =
          action.payload.data !== ""
            ? action.payload.data.data
            : TaskModel.initial();
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(editItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(editItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(changStageItem.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusStage = "completed";
      })
      .addCase(changStageItem.pending, (state) => {
        state.statusStage = "loading";
      })
      .addCase(changStageItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusStage = "failed";
        state.error = errorMessage(error);
      })
      .addCase(softDeleteItem.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(softDeleteItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(softDeleteItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(deleteItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(deleteItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(deleteAllItem.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(deleteAllItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(deleteAllItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(restoreAllItem.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(restoreAllItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(restoreAllItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(restoreItem.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(restoreItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(restoreItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      })
      .addCase(postTaskActivity.fulfilled, (state, action) => {
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(postTaskActivity.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(postTaskActivity.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = errorMessage(error);
      });
  },
});
export const {
  selectItem,
  resetActionState,
  resetState,
  resetStageState,
  changeAction,
  setLoading,
  setStage,
} = taskSlice.actions;
export default taskSlice.reducer;
